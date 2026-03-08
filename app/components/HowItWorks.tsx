import { MessageCircle, PenTool, CheckCircle, Share2, LayoutDashboard } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Contact us on WhatsApp',
    description: 'Tell us your names, date, and venue. We send you a simple details form to fill in at your own pace — usually takes 20 minutes.',
    icon: <MessageCircle className="w-8 h-8 text-[#5d2b36]" />,
  },
  {
    id: '02',
    title: 'We build your invitation',
    description: 'Our team sets up your personalised invitation page with your photo, theme colour, programme, and contribution details. You get a preview link within 48 hours.',
    icon: <PenTool className="w-8 h-8 text-[#5d2b36]" />,
  },
  {
    id: '03',
    title: 'You review and approve',
    description: 'Check everything on your phone. Request changes via WhatsApp. We update until it\'s perfect.',
    icon: <CheckCircle className="w-8 h-8 text-[#5d2b36]" />,
  },
  {
    id: '04',
    title: 'Share your link',
    description: 'One URL. Share it on WhatsApp, Instagram, or anywhere. Guests open it, RSVP, and receive their card instantly.',
    icon: <Share2 className="w-8 h-8 text-[#5d2b36]" />,
  },
  {
    id: '05',
    title: 'Manage from your dashboard',
    description: 'Log in to your private dashboard. See every RSVP, confirm guests, track contributions, and export your list — any time, from your phone.',
    icon: <LayoutDashboard className="w-8 h-8 text-[#5d2b36]" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 px-4 md:px-8 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-sm font-semibold tracking-wider uppercase mb-2 text-[#5d2b36]">HOW IT WORKS</h2>
          <h3 className="text-4xl md:text-5xl font-serif mb-4">Ready in <span className="text-[#5d2b36] italic">48 hours.</span></h3>
          <p className="max-w-2xl text-xl text-gray-600">
            You contact us. We build it. You review it. You share it. That's the whole process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="group p-8 border border-gray-100 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-6xl font-bold text-[#5d2b36] group-hover:opacity-20 transition-opacity">
                {step.id}
              </div>
              
              <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              
              <h4 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#5d2b36] transition-colors">
                {step.title}
              </h4>
              
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
