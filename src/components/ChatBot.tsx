import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { mockChatResponse, resetConversation } from '../mocks/chatMock';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: '¡Hola! 👋 Qué gusto saludarte. Soy el asistente de SunRiver Solution.\n\nAntes de contarte lo que hacemos, me gustaría conocerte mejor. ¿Me cuentas qué tipo de negocio tienes?',
        },
    ]);

    const resetChat = () => {
        resetConversation();
        setMessages([{
            role: 'assistant',
            content: '¡Hola de nuevo! 👋 Empezamos fresco. ¿Me cuentas sobre tu negocio? ¿A qué te dedicas?',
        }]);
    };
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            let botResponse: string;

            // En desarrollo local, usar mock (Vite no sirve /api/*)
            // En producción (Vercel), usar el endpoint real
            if (import.meta.env.DEV) {
                const historyForMock = messages.filter((m) => m.role === 'user' || m.role === 'assistant');
                botResponse = await mockChatResponse(userMessage, historyForMock);
            } else {
                // Producción - usa el endpoint de Vercel
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: messages.filter((m) => m.role === 'user' || m.role === 'assistant'),
                        userMessage,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();
                botResponse = data.response;
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: botResponse || '¡Estamos experimentando alta demanda! Puedes escribirnos por WhatsApp al +57 312 4183002 🚀',
                },
            ]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: '¡Nuestro asistente está descansando un momento! 😅 Puedes escribirnos directamente por WhatsApp al +57 312 4183002 o a jorge_duque@sunriver.cloud 💌',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Bubble Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 ${isOpen
                    ? 'bg-gray-700 rotate-0'
                    : 'bg-gradient-to-br from-sunriver-orange to-sunriver-blue animate-bounce'
                    }`}
                style={{ animationIterationCount: isOpen ? 0 : 3 }}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <MessageCircle className="w-7 h-7 text-white" />
                )}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] transition-all duration-500 origin-bottom-right ${isOpen
                    ? 'scale-100 opacity-100 translate-y-0'
                    : 'scale-75 opacity-0 translate-y-8 pointer-events-none'
                    }`}
            >
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col" style={{ height: '500px' }}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-sunriver-blue to-sunriver-blue/90 p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-sm">Asistente SunRiver</h3>
                            <p className="text-white/70 text-xs">Diagnóstico SOHI • Consultoría gratuita</p>
                        </div>
                        <button 
                            onClick={resetChat}
                            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                            title="Nueva conversación"
                        >
                            <RefreshCw className="w-4 h-4 text-white/80" />
                        </button>
                        <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div
                                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${msg.role === 'user'
                                        ? 'bg-sunriver-orange/10 text-sunriver-orange'
                                        : 'bg-sunriver-blue/10 text-sunriver-blue'
                                        }`}
                                >
                                    {msg.role === 'user' ? (
                                        <User className="w-4 h-4" />
                                    ) : (
                                        <Bot className="w-4 h-4" />
                                    )}
                                </div>
                                <div
                                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-sunriver-orange text-white rounded-br-md'
                                        : 'bg-white text-gray-700 border border-gray-100 shadow-sm rounded-bl-md'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="flex items-start gap-2">
                                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-sunriver-blue/10 text-sunriver-blue flex items-center justify-center">
                                    <Bot className="w-4 h-4" />
                                </div>
                                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-gray-100 shadow-sm">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Escribe tu mensaje..."
                                disabled={isLoading}
                                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-sunriver-blue/30 transition-all disabled:opacity-50"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 rounded-full bg-gradient-to-r from-sunriver-orange to-sunriver-blue text-white flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400 text-center mt-2">
                            🎯 Diagnóstico gratuito • Sin compromiso
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatBot;
