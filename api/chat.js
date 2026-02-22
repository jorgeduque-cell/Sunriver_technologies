// SunRiver ChatBot API - n8n Webhook Integration
// Proxies requests to n8n workflow while keeping webhook URL secure

// Simple in-memory rate limiter
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute per IP

function checkRateLimit(ip) {
    const now = Date.now();
    
    for (const [key, data] of rateLimitMap.entries()) {
        if (data.resetTime < now) {
            rateLimitMap.delete(key);
        }
    }
    
    const clientData = rateLimitMap.get(ip);
    
    if (!clientData || clientData.resetTime < now) {
        rateLimitMap.set(ip, {
            count: 1,
            resetTime: now + RATE_LIMIT_WINDOW_MS
        });
        return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
    }
    
    if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
        return { allowed: false, remaining: 0 };
    }
    
    clientData.count++;
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - clientData.count };
}

function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input
        .trim()
        .slice(0, 500)
        .replace(/[<>]/g, '')
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

function getClientIp(req) {
    return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
           req.headers['x-real-ip'] || 
           'unknown';
}

export default async function handler(req, res) {
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(clientIp);
    
    res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, rateLimit.remaining));
    
    if (!rateLimit.allowed) {
        return res.status(429).json({
            error: 'Rate limit exceeded',
            response: '⏳ Estamos recibiendo muchas consultas. Por favor intenta de nuevo en unos minutos o escríbenos por WhatsApp al +57 312 4183002 📱'
        });
    }

    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(204).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get n8n webhook URL from environment
    const n8nWebhookUrl = process.env.N8N_CHATBOT_WEBHOOK;
    
    if (!n8nWebhookUrl) {
        console.error('N8N_CHATBOT_WEBHOOK not configured');
        return res.status(500).json({ 
            response: '⚙️ ChatBot en mantenimiento. Por favor contáctanos por WhatsApp al +57 312 4183002 🔧'
        });
    }

    try {
        const { messages, userMessage } = req.body || {};

        if (!userMessage || typeof userMessage !== 'string') {
            return res.status(400).json({ 
                response: 'Por favor escribe un mensaje válido ✍️'
            });
        }

        const sanitizedMessage = sanitizeInput(userMessage);
        
        if (sanitizedMessage.length < 1) {
            return res.status(400).json({ 
                response: 'Por favor escribe un mensaje más completo 📝'
            });
        }

        // Prepare payload for n8n
        const payload = {
            message: sanitizedMessage,
            conversationHistory: messages || [],
            timestamp: new Date().toISOString(),
            source: 'website-chatbot',
            ip: clientIp,
            userAgent: req.headers['user-agent'] || 'unknown'
        };

        // Call n8n webhook with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

        const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error('n8n webhook error:', response.status);
            throw new Error(`n8n responded with ${response.status}`);
        }

        const data = await response.json();
        
        // n8n can return either { response: "..." } or { message: "..." } or plain text
        let botResponse = '';
        
        if (typeof data === 'string') {
            botResponse = data;
        } else if (data.response) {
            botResponse = data.response;
        } else if (data.message) {
            botResponse = data.message;
        } else if (data.output) {
            botResponse = data.output;
        } else {
            botResponse = JSON.stringify(data);
        }

        // Sanitize response
        botResponse = botResponse
            .replace(/[<>]/g, '')
            .trim()
            .slice(0, 1000);

        return res.status(200).json({
            response: botResponse || '¿En qué más puedo ayudarte? 😊'
        });
        
    } catch (error) {
        console.error('ChatBot error:', error.message);
        
        // Fallback response
        return res.status(200).json({
            response: '¡Hola! 👋 Estoy teniendo problemas técnicos momentáneamente. Por favor escríbenos por WhatsApp al +57 312 4183002 para una atención más rápida 🚀'
        });
    }
}
