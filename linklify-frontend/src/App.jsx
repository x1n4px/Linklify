import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import UrlForm from './components/UrlForm';
import UrlList from './components/UrlList';
import RedirectHandler from './components/RedirectHandler';
import CopyButton from './components/CopyButton';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import NotFound from './components/NotFound';

function App() {
  const [urls, setUrls] = useState([]);
  const [short_url, setShortUrl] = useState(null);

  const handleUrlShortened = (newUrl) => {
    setUrls([newUrl, ...urls]);
    setShortUrl(newUrl);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <div className="h-auto  py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-md mx-auto space-y-8">
                    <h1 className="text-3xl font-bold text-center text-gray-900">
                      Acortador de URLs
                    </h1>
                    <UrlForm onUrlShortened={handleUrlShortened} short_url={setShortUrl} />
                    <CopyButton urlToCopy={short_url} />
                    {/* <UrlList urls={urls} /> */}
                  </div>
                </div>
              </main>
              <Footer />
            </div>
          }
        />
        <Route path="/url/:code" element={<RedirectHandler />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
