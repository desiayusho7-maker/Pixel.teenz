import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import WhatsAppFloat from './WhatsAppFloat';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); window.scrollTo({ top: 0 }); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="noise relative min-h-screen">
      <AnimatedBackground />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-3 sm:pt-4">
        <nav
          className={`mx-auto max-w-6xl flex items-center justify-between gap-3 rounded-full px-3 sm:px-4 py-2 transition-all duration-300 ${
            scrolled ? 'glass-strong' : 'glass'
          }`}
        >
          <Link to="/" className="flex items-center gap-2 px-2 py-1 group">
            <LogoMark />
            <span className="font-display text-lg sm:text-xl tracking-tight">pixelteenz</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white bg-white/10 border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/919057281341"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex btn btn-wa !py-2 !px-4 text-sm"
            >
              <WhatsAppGlyph className="w-4 h-4" />
              Chat
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-10 h-10 rounded-full glass-thin flex items-center justify-center"
              aria-label="Open menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`md:hidden mx-auto max-w-6xl overflow-hidden transition-all duration-500 ${
            open ? 'max-h-96 mt-2 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass-strong rounded-3xl p-3 flex flex-col gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-2xl text-base font-medium transition-all ${
                    isActive ? 'bg-white/10 border border-white/15' : 'hover:bg-white/5'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <a
              href="https://wa.me/919057281341"
              target="_blank"
              rel="noreferrer"
              className="btn btn-wa mt-2"
            >
              <WhatsAppGlyph className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="relative z-10 pt-24 sm:pt-28">{children}</main>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 pb-6 pt-16">
        <div className="mx-auto max-w-6xl glass rounded-[28px] p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <LogoMark />
                <span className="font-display text-2xl">pixelteenz</span>
              </div>
              <p className="text-white/70 max-w-md text-sm leading-relaxed">
                A teen-run creative studio helping brands level up their online presence — modern web design, brand logos, and opening videos. High quality. Affordable. Fast.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://instagram.com/pixel.teenz"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                <Instagram className="w-4 h-4" />
                @pixel.teenz
              </a>
              <a href="https://wa.me/919057281341" target="_blank" rel="noreferrer" className="btn btn-wa">
                <WhatsAppGlyph className="w-4 h-4" />
                9057281341
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-xs text-white/50">
            <span>© {new Date().getFullYear()} Pixelteenz — Designed & built by teens who care.</span>
            <div className="flex gap-4">
              <Link to="/services" className="hoverline hover:text-white">Services</Link>
              <Link to="/work" className="hoverline hover:text-white">Work</Link>
              <Link to="/contact" className="hoverline hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  );
}

function LogoMark() {
  return (
    <span className="relative inline-flex w-8 h-8 rounded-xl overflow-hidden" aria-hidden>
      <span
        className="absolute inset-0"
        style={{
          background:
            'conic-gradient(from 210deg, #ff3ea5, #7c5cff, #22d3ee, #ffb547, #ff3ea5)',
        }}
      />
      <span className="absolute inset-[2px] rounded-[10px] bg-black/60 backdrop-blur-md" />
      <span className="relative m-auto grid grid-cols-2 gap-[2px] w-3 h-3">
        <span className="bg-white rounded-[2px]" />
        <span className="bg-white/60 rounded-[2px]" />
        <span className="bg-white/60 rounded-[2px]" />
        <span className="bg-white rounded-[2px]" />
      </span>
    </span>
  );
}

export function WhatsAppGlyph({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.001 2C6.478 2 2 6.478 2 12c0 1.897.522 3.744 1.52 5.353L2 22l4.782-1.494A9.973 9.973 0 0 0 12 22c5.523 0 10-4.477 10-10S17.524 2 12.001 2z" />
    </svg>
  );
}
