import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {getURL} from '../service/shortApi';

const RedirectHandler = () => {
  const { code } = useParams();
  console.log('Código recibido:', code);
  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await getURL(code);
        console.log('Response:', response);
        const originalUrl = response;
        window.location.href = originalUrl;
      } catch (error) {
        console.error('Error al redirigir:', error);
        // Podrías mostrar un mensaje de error o redirigir a una página 404
      }
    };

    redirect();
  }, [code]);

  return <p>Redirigiendo...</p>;
};

export default RedirectHandler;
