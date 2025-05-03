import { useState } from 'react';
import {postURL} from '../service/shortApi'


const UrlForm = ({ onUrlShortened }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!originalUrl.trim()) {
      setError('Por favor ingresa una URL');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      console.log('Original URL:', originalUrl);
      // Aquí debes reemplazar con tu endpoint real
      const response = await postURL(originalUrl);
      console.log('Response:', response);
      onUrlShortened(response);
      setOriginalUrl('');
    } catch (err) {
      setError(err.message || 'Ocurrió un error al acortar la URL');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Ingresa tu URL larga aquí"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Procesando...' : 'Acortar URL'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UrlForm;