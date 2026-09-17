import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Film, PenTool, Sparkles, Wand2, Wallet } from 'lucide-react';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import { WhatsAppGlyph } from '../components/Layout';

type ServiceKey = 'web' | 'brand' | 'video';

const SERVICES: {
  key: ServiceKey; icon: React.ComponentType<{ className?: string }>; title: string; tag: string;
  from: string; to: string; blurb: string; bullets: string[]; deliverables: string[]; timeline: string; priceMin: number; priceMax: number;
}[] = [
  {
    key: 'web',
    icon: PenTool,
    title: 'Web Design',
    tag: 'Landing pages & small business sites',
    from: '#ff3ea5', to: '#7c5cff',
    blurb: 'Fast, animated, mobile-first sites that turn scrolls into signups. Built on modern React with clean, editable code.',
    bullets: [
      'Landing pages that actually convert',
      'Portfolios, restaurants, D2C, creators',
      'Interactive animations & scroll effects',
      'SEO basics + performance tuned',
    ],
    deliverables: ['Design in Figma', 'Fully coded site', 'Vercel deploy + domain setup', 'Basic analytics'],
    timeline: '5–10 days',
    priceMin: 4999, priceMax: 24999,
  },
  {
    key: 'brand',
    icon: Wand2,
    title: 'Brand Identity',
    tag: 'Logos & brand kits',
    from: '#22d3ee', to: '#baff45',
    blurb: 'Distinct, ownable brand marks with a full mini-kit — not a generic wordmark you’ll want to redesign in 3 months.',
    bullets: [
      'Primary logo + secondary mark',
      'Color palette & typography',
      'Social profile kit',
      'Business card / signature layout',
    ],
    deliverables: ['Vector files (SVG, PDF)', 'PNG exports (light/dark)', 'Brand cheat-sheet PDF', 'Font list & pairings'],
    timeline: '2–4 days',
    priceMin: 1999, priceMax: 9999,
  },
  {
    key: 'video',
    icon: Film,
    title: 'Opening Videos',
    tag: 'Intro animations & motion IDs',
    from: '#ffb547', to: '#ff3ea5',
    blurb: 'Cinematic 5–15 second intros for YouTube, Instagram, product launches or brand event screens. Sound design included.',
    bullets: [
      'YouTube channel intros',
      'Instagram Reel openers',
      'Product launch stingers',
      'Sound design + music sync',
    ],
    deliverables: ['4K MP4 export', '9:16, 1:1 & 16:9 versions', 'Editable After Effects file (add-on)', 'Optional loop version'],
    timeline: '3–7 days',
    priceMin: 2999, priceMax: 14999,
  },
];

export default function Services() {
  const [open, setOpen] = useState<ServiceKey | null>('web');
  const [selected, setSelected] = useState<Record<ServiceKey, boolean>>({ web: true, brand: false, video: false });
  const [rush, setRush] = useState(false);

  useEffect(() => { document.title = 'Services — Pixelteenz'; }, []);

  const { min, max } = useMemo(() => {
    const chosen = SERVICES.filter(s => selected[s.key]);
    let mn = chosen.reduce((a, s) => a + s.priceMin, 0);
    let mx = chosen.reduce((a, s) => a + s.priceMax, 0);
    if (chosen.length > 1) { mn = Math.round(mn * 0.9); mx = Math.round(mx * 0.92); }
    if (rush) { mn = Math.round(mn * 1.25); mx = Math.round(mx * 1.25); }
    return { min: mn, max: mx };
  }, [selected, rush]);

  const anySelected = SERVICES.some(s => selected[s.key]);

  return (
    <div className="px-4 sm:px-6">
      {/* HEADER */}
      <section className="mx-auto max-w-6xl pt-8 sm:pt-12 pb-10">
        <Reveal>
          <span className="chip mb-5"><Sparkles className="w-3.5 h-3.5" /> What we make</span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95]">
            Three services.<br />
            <span className="gradient-text">Endless combos.</span>
          </h1>
          <p className="mt-6 max-w-xl text-white/70">
            Pick one, mix all three, or build your own drop. Every project is fully custom — no cookie-cutter templates, no AI-slop.
          </p>
        </Reveal>
      </section>

      {/* ACCORDION SERVICES */}
      <section className="mx-auto max-w-6xl pb-16 sm:pb-24">
        <div className="space-y-4">
          {SERVICES.map((s, i) => {
            const isOpen = open === s.key;
            return (
              <Reveal key={s.key} delay={i * 0.06}>
                <div className={`rounded-[28px] overflow-hidden ${isOpen ? 'glass-strong' : 'glass'} glass-hover`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : s.key)}
                    className="w-full text-left p-5 sm:p-7 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl grid place-items-center shrink-0" style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
                      <s.icon className="w-6 h-6 text-black/85" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display text-2xl sm:text-3xl">{s.title}</span>
                        <span className="chip">{s.tag}</span>
                      </div>
                      <div className="text-white/60 text-sm mt-1 truncate">Starting ₹{s.priceMin.toLocaleString()} · {s.timeline}</div>
                    </div>
                    <span className={`w-10 h-10 rounded-full glass-thin grid place-items-center transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.2, 0.9, 0.2, 1] }}
                      >
                        <div className="px-5 sm:px-7 pb-7 grid md:grid-cols-2 gap-8">
                          <div>
                            <p className="text-white/80 leading-relaxed">{s.blurb}</p>
                            <ul className="mt-5 space-y-2 text-sm">
                              {s.bullets.map(b => (
                                <li key={b} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 mt-0.5 text-emerald-300" />
                                  <span className="text-white/85">{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="glass-thin rounded-2xl p-5">
                            <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Deliverables</div>
                            <ul className="space-y-2 text-sm mb-5">
                              {s.deliverables.map(d => (
                                <li key={d} className="flex items-start gap-2">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }} />
                                  {d}
                                </li>
                              ))}
                            </ul>
                            <div className="flex items-center justify-between text-sm text-white/70 border-t border-white/10 pt-4">
                              <span>Timeline</span>
                              <span className="text-white">{s.timeline}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-white/70 mt-2">
                              <span>Price range</span>
                              <span className="text-white">₹{s.priceMin.toLocaleString()} – ₹{s.priceMax.toLocaleString()}</span>
                            </div>
                            <a href="https://wa.me/919057281341" target="_blank" rel="noreferrer" className="btn btn-wa w-full mt-5">
                              <WhatsAppGlyph className="w-4 h-4" />
                              Book {s.title}
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* BUILD YOUR PACKAGE */}
      <section className="mx-auto max-w-6xl pb-24">
        <Reveal>
          <div className="glass-strong rounded-[32px] p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl bg-[#7c5cff]/40" />
            <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full blur-3xl bg-[#22d3ee]/30" />

            <div className="relative flex items-start justify-between flex-wrap gap-6 mb-8">
              <div>
                <span className="chip mb-3"><Wallet className="w-3.5 h-3.5" /> Build your package</span>
                <h2 className="font-display text-4xl sm:text-5xl">Mix. Match. Estimate.</h2>
                <p className="text-white/70 mt-3 max-w-md">Toggle what you need — we’ll show a real price range. No fake “starting at” gimmicks.</p>
              </div>
            </div>

            <div className="relative grid md:grid-cols-3 gap-4 mb-6">
              {SERVICES.map(s => {
                const on = selected[s.key];
                return (
                  <TiltCard key={s.key} className={`rounded-[24px] p-5 cursor-pointer transition-all ${on ? 'glass-strong ring-1 ring-white/30' : 'glass'}`}>
                    <button onClick={() => setSelected(v => ({ ...v, [s.key]: !v[s.key] }))} className="w-full text-left">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-2xl grid place-items-center" style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
                          <s.icon className="w-5 h-5 text-black/85" />
                        </div>
                        <span className={`w-6 h-6 rounded-full grid place-items-center border ${on ? 'bg-white text-black border-white' : 'border-white/30'}`}>
                          {on && <Check className="w-4 h-4" />}
                        </span>
                      </div>
                      <div className="font-display text-xl">{s.title}</div>
                      <div className="text-white/60 text-sm mt-1">{s.tag}</div>
                      <div className="text-white/70 text-xs mt-3">from ₹{s.priceMin.toLocaleString()}</div>
                    </button>
                  </TiltCard>
                );
              })}
            </div>

            <div className="relative flex items-center justify-between glass-thin rounded-2xl p-4 mb-6">
              <div>
                <div className="font-medium">Rush delivery</div>
                <div className="text-xs text-white/60">Priority queue, +25% — usually cuts timeline in half.</div>
              </div>
              <button
                onClick={() => setRush(v => !v)}
                aria-pressed={rush}
                className={`w-14 h-8 rounded-full p-1 transition-colors ${rush ? 'bg-gradient-to-r from-[#ff3ea5] to-[#7c5cff]' : 'bg-white/10'}`}
              >
                <span className={`block w-6 h-6 rounded-full bg-white transition-transform ${rush ? 'translate-x-6' : ''}`} />
              </button>
            </div>

            <div className="relative flex flex-col sm:flex-row gap-4 items-center justify-between glass rounded-2xl p-5">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/50">Estimated range</div>
                <div className="font-display text-4xl sm:text-5xl mt-1">
                  {anySelected ? <>₹{min.toLocaleString()} <span className="text-white/40">–</span> ₹{max.toLocaleString()}</> : <span className="text-white/40">Select at least one</span>}
                </div>
                <div className="text-white/60 text-xs mt-1">Final quote confirmed on WhatsApp after a 5-min chat.</div>
              </div>
              <a href="https://wa.me/919057281341" target="_blank" rel="noreferrer" className="btn btn-wa">
                <WhatsAppGlyph className="w-5 h-5" /> Lock this package <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
