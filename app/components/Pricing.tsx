import { Check } from 'lucide-react';

const features = [
  'Custom Design & Theme',
  'Unlimited Guests',
  'RSVP Management Dashboard',
  'WhatsApp Integration',
  'Map & Directions Integration',
  'Gift Registry Links',
  'Digital Save the Date',
  'Priority Support'
];

export default function Pricing() {
  return (
    <section className="bg-[#fdf8f6] py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-sm font-semibold tracking-wider uppercase mb-2 text-[#5d2b36]">PRICING</h2>
        <h3 className="text-3xl md:text-4xl font-serif mb-6 text-gray-900">Simple, transparent pricing</h3>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-12">
          One fixed price for everything. No hidden fees, no per-guest charges.
        </p>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
          <div className="p-8 md:p-12">
            <h4 className="text-2xl font-serif text-[#5d2b36] mb-4">Premium Digital Invitation Suite</h4>
            <div className="flex justify-center items-baseline mb-8">
              <span className="text-5xl font-bold text-gray-900">TZS 150,000</span>
              <span className="text-gray-500 ml-2">/ wedding</span>
            </div>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-10 max-w-2xl mx-auto">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="bg-[#5d2b36]/10 p-1 rounded-full">
                    <Check className="w-4 h-4 text-[#5d2b36]" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className="w-full md:w-auto bg-[#5d2b36] text-white px-8 py-4 rounded-full font-medium hover:bg-[#4a1d24] transition-colors shadow-lg shadow-[#5d2b36]/20">
              Get Started Now
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 text-sm text-gray-500 border-t border-gray-100">
            Includes 12 months of hosting for your invitation website
          </div>
        </div>
      </div>
    </section>
  );
}
