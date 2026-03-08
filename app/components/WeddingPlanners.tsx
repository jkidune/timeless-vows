import { BadgeCheck, DollarSign, Handshake, LayoutDashboard, MessageCircle } from 'lucide-react';

// Note: The user provided specific text for 5 items, but the reference image shows 6 cards.
// I will map the user's text to the cards where possible, but use the reference image layout.
// Let's re-read the user prompt carefully.
// User content:
// 01 Your brand, your credit
// 02 Fixed price per wedding
// 03 We do the work, you take the win
// 04 Private dashboard access
// 05 Direct WhatsApp support
//
// The user provided 5 items. The reference image shows 6.
// I should stick to the USER PROVIDED CONTENT primarily, but maybe layout as a grid.
// If there are 5 items, a grid of 3 then 2 centered might look good, or just a grid that flows.

const userContentPlanners = [
  {
    id: '01',
    title: 'Your brand, your credit',
    description: 'Offer Timeless Vows as part of your premium service. Your couples see your name attached to something extraordinary.',
    icon: <BadgeCheck className="w-6 h-6 text-white" />,
  },
  {
    id: '02',
    title: 'Fixed price per wedding',
    description: 'No surprises. Predictable margins you can build into your packages from day one.',
    icon: <DollarSign className="w-6 h-6 text-white" />,
  },
  {
    id: '03',
    title: 'We do the work, you take the win',
    description: 'Your client fills in a form, we build and deliver the invitation. You present it. Takes almost no time from your schedule.',
    icon: <Handshake className="w-6 h-6 text-white" />,
  },
  {
    id: '04',
    title: 'Private dashboard access',
    description: 'You get full dashboard access for every wedding you manage — track RSVPs, confirm guests, and export lists without waiting for the couple.',
    icon: <LayoutDashboard className="w-6 h-6 text-white" />,
  },
  {
    id: '05',
    title: 'Direct WhatsApp support',
    description: 'Fast responses, always. We never keep you waiting when your client is waiting.',
    icon: <MessageCircle className="w-6 h-6 text-white" />,
  },
];

export default function WeddingPlanners() {
  return (
    <section className="bg-[#5d2b36] py-20 px-4 md:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-sm font-semibold tracking-wider uppercase mb-2 text-white/70">FOR WEDDING PLANNERS</h2>
          <h3 className="text-3xl md:text-4xl font-serif mb-6">Are you a wedding planner?</h3>
          <p className="max-w-2xl text-lg text-white/80">
            Offer your couples something they've never seen from any other planner in Tanzania. 
            Partner with Timeless Vows and make a premium digital invitation part of every package you sell.
          </p>
          <div className="mt-8">
            <h4 className="text-xl font-medium mb-4">Why planners work with us:</h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userContentPlanners.map((planner) => (
            <div 
              key={planner.id} 
              className="bg-white/10 border border-white/10 rounded-2xl p-8 relative hover:bg-white/15 transition-colors"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/10 rounded-xl">
                  {planner.icon}
                </div>
                <span className="text-white/40 font-mono text-sm">{planner.id}</span>
              </div>
              
              <h5 className="text-xl font-semibold mb-3">{planner.title}</h5>
              <p className="text-white/70 leading-relaxed text-sm">
                {planner.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="https://wa.me/your-number" 
            className="inline-flex items-center gap-2 bg-white text-[#5d2b36] font-medium px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Let's Work Together — WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
