import { useState } from 'react';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

const CopyButton = ({ urlToCopy }) => {
    const [isCopied, setIsCopied] = useState(false);
    const API_URL = import.meta.env.VITE_WEB_URL;


    const handleCopy = async () => {
        try {
            const url = 
            await navigator.clipboard.writeText(API_URL+"/"+urlToCopy);
            setIsCopied(true);

            // Resetear el estado después de 2 segundos
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            console.error('Error al copiar: ', err);
        }
    };

    return (
        <>
            {urlToCopy !== null && (
                <div className="flex justify-center mt-6">
                <button
                  onClick={handleCopy}
                  disabled={isCopied}
                  className={`relative px-6 py-3 rounded-lg text-white font-medium text-lg shadow-md transition-all duration-200 ${
                    isCopied
                      ? 'bg-green-600 scale-105'
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                  } flex items-center space-x-2`}
                >
                  {isCopied ? (
                    <>
                      <CheckIcon className="h-6 w-6" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <DocumentDuplicateIcon className="h-6 w-6" />
                      <span>Copiar URL</span>
                    </>
                  )}
                  
                  {/* Efecto de onda al copiar */}
                  {isCopied && (
                    <span className="absolute -inset-1">
                      <span className="absolute inset-0 bg-green-500 rounded-lg opacity-0 animate-ping"></span>
                    </span>
                  )}
                </button>
                
                {/* Efecto de confeti (opcional) */}
                {isCopied && (
                  <div className="fixed inset-0 pointer-events-none flex justify-center items-end">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-2 h-2 bg-green-500 rounded-full"
                        style={{
                          bottom: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${i * 36}deg) translateY(-20px)`,
                          animation: `confeti-fall ${Math.random() * 1 + 0.5}s ease-in forwards`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
        </>
    );
};

export default CopyButton;