import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import WeddingPlanners from "./components/WeddingPlanners";

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Hero />
      
      <div id="how-it-works">
        <HowItWorks />
      </div>
      
      <div id="pricing">
        <Pricing />
      </div>
      
      <div id="planners">
        <WeddingPlanners />
      </div>
      
      {/* Temporary Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif text-[#fdf8f6]">Timeless Vows</div>
          <div className="flex gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Timeless Vows.
          </div>
        </div>
      </footer>
    </main>
  );
}
