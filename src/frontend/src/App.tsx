import HeroSection from './components/HeroSection';
import VideoDownloader from './components/VideoDownloader';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <main className="flex-1 container mx-auto px-4 py-12">
        <VideoDownloader />
      </main>
      <Footer />
    </div>
  );
}

export default App;
