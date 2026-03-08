import { ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#fdf8f6]">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#5d2b36]/5 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#5d2b36]/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#5d2b36]/10 text-[#5d2b36] text-sm font-medium mb-8 animate-fade-in-up">
          <Heart className="w-4 h-4 fill-current" />
          <span>The new standard for wedding invitations</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#5d2b36] mb-8 leading-tight tracking-tight">
          Timeless Vows
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-600 mb-12 font-light leading-relaxed">
          Premium digital invitations that honor your special day. 
          Elegance meets technology for the modern couple.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/create" 
            className="px-8 py-4 bg-[#5d2b36] text-white rounded-full font-medium text-lg hover:bg-[#4a1d24] transition-all hover:shadow-lg hover:shadow-[#5d2b36]/20 flex items-center gap-2 group"
          >
            Create Your Invitation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="#how-it-works" 
            className="px-8 py-4 bg-white text-[#5d2b36] border border-[#5d2b36]/20 rounded-full font-medium text-lg hover:bg-gray-50 transition-colors"
          >
            See How It Works
          </Link>
        </div>
      </div>
    </section>
  );
}
