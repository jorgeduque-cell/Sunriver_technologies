// SunRiver Contact Form API - n8n Webhook Proxy
// Proxies form submissions to n8n while avoiding CORS issues

// Simple in-memory rate limiter
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per minute per IP

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
        .slice(0, 1000)
        .replace(/[<>]/g, '')
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

function getClientIp(req) {
    return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
           req.headers['x-real-ip'] || 
           'unknown';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    // Allow empty phone or valid phone number (at least 7 digits)
    if (!phone) return true;
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7;
}

export default async function handler(req, res) {
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(clientIp);
    
    res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, rateLimit.remaining));
    
    if (!rateLimit.allowed) {
        return res.status(429).json({
            error: 'Rate limit exceeded',
            message: '⏳ Estamos recibiendo muchas solicitudes. Por favor intenta de nuevo en unos minutos o contáctanos por WhatsApp al +57 312 4183002 📱'
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
    const n8nWebhookUrl = process.env.N8N_CONTACT_WEBHOOK;
    
    if (!n8nWebhookUrl) {
        console.error('N8N_CONTACT_WEBHOOK not configured');
        return res.status(500).json({ 
            error: 'Webhook not configured',
            message: '⚙️ Formulario en mantenimiento. Por favor contáctanos por WhatsApp al +57 312 4183002 🔧'
        });
    }

    try {
        const { name, email, phone, message, company } = req.body || {};

        // Validation
        if (!name || typeof name !== 'string' || name.trim().length < 2) {
            return res.status(400).json({ 
                error: 'Invalid name',
                message: 'Por favor ingresa un nombre válido (mínimo 2 caracteres) ✍️'
            });
        }

        if (!email || !validateEmail(email)) {
            return res.status(400).json({ 
                error: 'Invalid email',
                message: 'Por favor ingresa un correo electrónico válido 📧'
            });
        }

        if (phone && !validatePhone(phone)) {
            return res.status(400).json({ 
                error: 'Invalid phone',
                message: 'Por favor ingresa un número de teléfono válido 📞'
            });
        }

        if (!message || typeof message !== 'string' || message.trim().length < 10) {
            return res.status(400).json({ 
                error: 'Invalid message',
                message: 'Por favor ingresa un mensaje más detallado (mínimo 10 caracteres) 📝'
            });
        }

        // Sanitize inputs
        const sanitizedData = {
            name: sanitizeInput(name),
            email: sanitizeInput(email).toLowerCase(),
            phone: phone ? sanitizeInput(phone) : '',
            company: company ? sanitizeInput(company) : '',
            message: sanitizeInput(message),
            timestamp: new Date().toISOString(),
            source: 'website-contact-form',
            ip: clientIp,
            userAgent: req.headers['user-agent'] || 'unknown',
            origin: req.headers.origin || 'unknown'
        };

        // Call n8n webhook with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

        const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sanitizedData),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error('n8n webhook error:', response.status);
            throw new Error(`n8n responded with ${response.status}`);
        }

        // n8n can return various response formats
        let responseData;
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = { message: await response.text() };
        }

        return res.status(200).json({
            success: true,
            message: '✅ ¡Mensaje enviado exitosamente! Te contactaremos pronto.',
            data: responseData
        });
        
    } catch (error) {
        console.error('Contact form error:', error.message);
        
        // Fallback response
        return res.status(200).json({
            success: true,
            message: '✅ ¡Mensaje recibido! Te contactaremos pronto.'
        });
    }
}
