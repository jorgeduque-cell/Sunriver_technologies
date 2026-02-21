export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        const { messages, userMessage } = req.body;

        if (!userMessage) {
            return res.status(400).json({ error: 'Missing userMessage' });
        }

        const SYSTEM_PROMPT = `Eres el asistente virtual de SunRiver Solution, una firma tecnológica colombiana especializada en Desarrollo Web con Propósito impulsado por Inteligencia Artificial.

SOBRE SUNRIVER SOLUTION:
- Creamos páginas web ultra profesionales a precios accesibles para PyMEs y emprendedores.
- Cada página web incluye automatizaciones inteligentes: chatbots con IA, formularios conectados a CRMs, auto-respuestas, agendamiento automático.
- Ofrecemos servicios de automatización empresarial con IA (leads, ventas, operaciones).
- Usamos el framework SOHI (Sunriver Operational Health Index) para medir la madurez digital.
- Contacto: jorge_duque@sunriver.cloud | WhatsApp: +57 312 4183002
- Sede: Colombia

TU ROL:
- Sé cálido, profesional y entusiasta
- Responde en español
- Sé breve y directo (máximo 3-4 oraciones por respuesta)
- Si preguntan precios, di que ofrecemos planes desde precios muy accesibles y que agenden una llamada gratuita
- Siempre invita a agendar una auditoría gratuita de 30 minutos
- Si no sabes algo específico, invita a contactar directamente al equipo`;

        // Build conversation history
        const conversationHistory = (messages || []).map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
        }));

        conversationHistory.push({
            role: 'user',
            parts: [{ text: userMessage }],
        });

        // Try models in order of preference
        const models = ['gemini-2.0-flash-lite', 'gemini-2.0-flash', 'gemini-1.5-flash'];
        let aiResponse = null;

        for (const model of models) {
            try {
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                            contents: conversationHistory,
                            generationConfig: { temperature: 0.7, maxOutputTokens: 300 },
                        }),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    const errorMsg = errorData?.error?.message || '';
                    if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('RESOURCE_EXHAUSTED') || response.status === 429) {
                        continue; // Try next model
                    }
                    throw new Error(errorMsg || `HTTP ${response.status}`);
                }

                const data = await response.json();
                aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (aiResponse) break;
            } catch (err) {
                if (err.message?.includes('429') || err.message?.includes('quota')) continue;
                throw err;
            }
        }

        return res.status(200).json({
            response: aiResponse || '¡Estamos experimentando alta demanda! Mientras tanto, puedes escribirnos por WhatsApp al +57 312 4183002 🚀',
        });
    } catch (error) {
        console.error('Gemini proxy error:', error);
        return res.status(500).json({
            response: '¡Nuestro asistente está descansando un momento! 😅 Puedes escribirnos directamente por WhatsApp al +57 312 4183002 💌',
        });
    }
}
