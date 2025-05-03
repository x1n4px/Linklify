const UrlList = ({ urls }) => {
    if (urls.length === 0) {
      return (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">No hay URLs acortadas aún.</p>
        </div>
      );
    }
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Tus URLs acortadas</h2>
        <ul className="space-y-4">
          {urls.map((url) => (
            <li key={url.shortUrl} className="border-b pb-4 last:border-b-0">
              <div className="flex flex-col space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Original:</p>
                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {url.originalUrl}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Acortada:</p>
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    {url.shortUrl}
                  </a>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(url.shortUrl)}
                  className="mt-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                >
                  Copiar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default UrlList;