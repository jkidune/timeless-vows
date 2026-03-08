import Hero from "./components/Hero";
import ProblemStatement from "./components/ProblemStatement";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import WeddingPlanners from "./components/WeddingPlanners";
import WhatsIncluded from "./components/WhatsIncluded";
import ConfirmationSection from "./components/ConfirmationSection";
import Comparison from "./components/Comparison";
import Footer from "./components/Footer";
// import WhatsIncluded from "./components/WhatsIncluded"; // We will build this next!

export default function Home() {
  return (
    <main className="min-h-screen font-['Manrope',sans-serif] bg-[#F6F2EE]">
      <Hero />
      
      <div id="problem-statement">
        <ProblemStatement />
      </div>

<div id="features">
        <WhatsIncluded />
      </div>

      <div id="confirmation-card">
        <ConfirmationSection />
      </div>
     
     <div id="comparison">
        <Comparison />
      </div>
      
      <div id="how-it-works">
        <HowItWorks />
      </div>
      
      <div id="pricing">
        <Pricing />
      </div>
      
      <div id="planners">
        <WeddingPlanners />
      </div>
      
      <Footer />
    </main>
  );
}