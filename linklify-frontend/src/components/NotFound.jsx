import React from 'react';

const NotFound = () =>  {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <div className="h-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto space-y-8 text-center">
              <h1 className="text-6xl font-bold text-gray-900">404</h1>
              <p className="text-xl text-gray-600">Página no encontrada</p>
              <p className="text-gray-500">La URL que has solicitado no existe.</p>
              <Link to="/" className="text-blue-500 hover:underline">
                Volver a la página principal
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

export default NotFound;