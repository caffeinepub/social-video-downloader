import { Download } from 'lucide-react';

export default function HeroSection() {
  return (
    <header className="relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>
      
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Download className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Social Video Downloader
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-2">
            Download videos from Instagram and Facebook without watermarks
          </p>
          <p className="text-sm md:text-base text-white/70">
            Fast, free, and easy to use. Just paste the link and download.
          </p>
        </div>
      </div>
    </header>
  );
}
