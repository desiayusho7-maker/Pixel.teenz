import { useEffect, useState } from 'react';
import { WhatsAppGlyph } from './Layout';

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    const p = setTimeout(() => setPulse(false), 8000);
    return () => { clearTimeout(t); clearTimeout(p); };
  }, []);

  return (
    <a
      href="https://wa.me/919057281341"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp with Pixelteenz"
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 group transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-[color:var(--whatsapp)]/60 blur-xl scale-125 opacity-70 group-hover:opacity-100 transition" />
      {pulse && (
        <span className="absolute inset-0 rounded-full border-2 border-[color:var(--whatsapp)] animate-ping" />
      )}
      <span className="relative flex items-center gap-2 pl-4 pr-5 py-3 rounded-full text-white font-semibold shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #4ef296 0%, #25d366 55%, #12a94f 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -2px 0 rgba(0,60,20,0.35), 0 20px 50px -12px rgba(37, 211, 102, 0.7)'
        }}
      >
        <WhatsAppGlyph className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">Chat with us</span>
      </span>
    </a>
  );
}
