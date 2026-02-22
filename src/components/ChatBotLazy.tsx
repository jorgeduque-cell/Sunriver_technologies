import { useState, useEffect, lazy, Suspense } from 'react';
import { MessageCircle } from 'lucide-react';

const ChatBot = lazy(() => import('./ChatBot'));

// Botón simple que se muestra inmediatamente (ultra ligero)
const ChatButtonPlaceholder = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-sunriver-orange to-sunriver-blue shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 animate-bounce"
    style={{ animationIterationCount: 3 }}
    aria-label="Abrir chat"
  >
    <MessageCircle className="w-7 h-7 text-white" />
  </button>
);

const ChatBotLazy = () => {
  const [loadChat, setLoadChat] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Cargar ChatBot solo después de que la página esté completamente interactiva
    // y el usuario ha tenido tiempo de interactuar o pasado 5 segundos
    
    const handleInteraction = () => {
      if (!loadChat) {
        setLoadChat(true);
        // Remover listeners después de cargar
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
      }
    };

    // Cargar en cuanto el usuario interactúe (scroll, click, touch)
    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    // O después de 5 segundos (lo que ocurra primero)
    const timeoutId = setTimeout(() => {
      if (!loadChat) {
        setLoadChat(true);
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
      }
    }, 5000);

    // Marcar como listo para evitar hidratación incorrecta
    setIsReady(true);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <>
      {!loadChat && (
        <ChatButtonPlaceholder onClick={() => setLoadChat(true)} />
      )}
      
      {loadChat && (
        <Suspense fallback={
          <ChatButtonPlaceholder onClick={() => {}} />
        }>
          <ChatBot />
        </Suspense>
      )}
    </>
  );
};

export default ChatBotLazy;
