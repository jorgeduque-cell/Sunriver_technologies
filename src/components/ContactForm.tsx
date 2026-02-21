import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    company: z.string().min(2, 'El nombre de la empresa es requerido'),
    message: z.string().min(10, 'Cuéntanos un poco más sobre tu proyecto'),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

        try {
            if (!webhookUrl) {
                // Demo mode fallback
                await new Promise((resolve) => setTimeout(resolve, 1500));
                // Demo mode - no webhook configured
                toast.success('Mensaje enviado (Modo Demo)', {
                    description: 'Configura VITE_N8N_WEBHOOK_URL en .env para producción.',
                });
            } else {
                // Real Webhook Submission
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...data,
                        source: 'sunriver.solutions',
                        timestamp: new Date().toISOString()
                    }),
                });

                if (!response.ok) throw new Error('Error en el envío');

                toast.success('¡Mensaje recibido!', {
                    description: 'Nuestro equipo de IA ya está procesando tu solicitud.',
                });
            }
            reset();
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Error al enviar', {
                description: 'Hubo un problema. Por favor contáctanos por WhatsApp.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Escríbenos</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input
                        {...register('name')}
                        placeholder="Tu Nombre"
                        className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-sunriver-orange transition-colors`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <input
                        {...register('email')}
                        placeholder="Tu Email Profesional"
                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-sunriver-orange transition-colors`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <input
                        {...register('company')}
                        placeholder="Nombre de tu Empresa"
                        className={`w-full bg-white/5 border ${errors.company ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-sunriver-orange transition-colors`}
                    />
                    {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>}
                </div>

                <div>
                    <textarea
                        {...register('message')}
                        placeholder="¿En qué podemos ayudarte?"
                        rows={4}
                        className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-sunriver-orange transition-colors resize-none`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sunriver-orange to-sunriver-orange/90 hover:shadow-glow text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Enviar Mensaje
                            <Send className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
