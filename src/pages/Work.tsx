import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, Package, Star, X } from 'lucide-react';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import { WhatsAppGlyph } from '../components/Layout';

type Portfolio = {
  id: number; slug: string; title: string; client: string; category: string; tagline: string;
  goal: string; deliverables: string; turnaround: string; color_from: string; color_to: string; year: number;
};

const FILTERS = ['All', 'Web', 'Logo', 'Video'] as const;
type Filter = typeof FILTERS[number];

export default function Work() {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [filter, setFilter] = useState<Filter>('All');
  const [active, setActive] = useState<Portfolio | null>(null);

  useEffect(() => {
    document.title = 'Work — Pixelteenz';
    fetch('/api/portfolio').then(r => r.json()).then(setItems).catch(() => {});
  }, []);

  const filtered = useMemo(
    () => (filter === 'All' ? items : items.filter(i => i.category === filter)),
    [filter, items]
  );

  return (
    <div className="px-4 sm:px-6">
      {/* HEADER */}
      <section className="mx-auto max-w-6xl pt-8 sm:pt-12 pb-10">
        <Reveal>
          <span className="chip mb-5"><Star className="w-3.5 h-3.5" /> Selected projects</span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95]">
            Work that <span className="gradient-text">performs</span>.
          </h1>
          <p className="mt-6 max-w-xl text-white/70">
            A tiny slice of what we’ve shipped — sites, marks, and openers for brands who wanted to look 3x bigger than they are.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-white text-black shadow-lg'
                    : 'glass-thin text-white/80 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-6xl pb-12">
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.button
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, y: -8 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.04, ease: [0.2, 0.9, 0.2, 1] }}
                onClick={() => setActive(p)}
                className="text-left"
              >
                <TiltCard className="glass rounded-[24px] p-3 h-full glass-hover">
                  <div
                    className="aspect-[4/5] rounded-2xl relative overflow-hidden mb-3"
                    style={{
                      background: `radial-gradient(120% 90% at 20% 10%, ${p.color_from} 0%, transparent 55%), radial-gradient(120% 90% at 90% 90%, ${p.color_to} 0%, transparent 55%), #0a0217`,
                    }}
                  >
                    <div className="absolute inset-3 rounded-xl border border-white/15 backdrop-blur-sm" />
                    <div className="absolute inset-0 grid place-items-center p-6 text-center">
                      <div>
                        <div className="font-display text-4xl sm:text-5xl leading-none">{p.title}</div>
                        <div className="mt-2 text-xs sm:text-sm text-white/80">{p.tagline}</div>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 chip">{p.category}</div>
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-black grid place-items-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-2 pb-2">
                    <div>
                      <div className="font-medium">{p.client}</div>
                      <div className="text-xs text-white/50">{p.year} · {p.turnaround}</div>
                    </div>
                  </div>
                </TiltCard>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* BEFORE/AFTER */}
      <section className="mx-auto max-w-6xl pb-24">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="chip mb-3">Case study</span>
              <h2 className="font-display text-4xl sm:text-5xl">Before → After</h2>
              <p className="text-white/60 mt-2 max-w-md text-sm">Drag the slider to see how a small brand refresh changes everything.</p>
            </div>
          </div>
          <BeforeAfter />
        </Reveal>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-[28px] w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div
                className="aspect-video relative overflow-hidden rounded-t-[28px]"
                style={{
                  background: `radial-gradient(120% 90% at 20% 10%, ${active.color_from} 0%, transparent 55%), radial-gradient(120% 90% at 90% 90%, ${active.color_to} 0%, transparent 55%), #0a0217`,
                }}
              >
                <div className="absolute inset-6 rounded-2xl border border-white/15 backdrop-blur-sm" />
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <div className="font-display text-6xl sm:text-8xl">{active.title}</div>
                    <div className="mt-3 text-white/80">{active.tagline}</div>
                  </div>
                </div>
                <button onClick={() => setActive(null)} aria-label="Close" className="absolute top-4 right-4 w-10 h-10 rounded-full glass grid place-items-center">
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute top-4 left-4 chip">{active.category}</div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 flex-wrap mb-5">
                  <h3 className="font-display text-3xl">{active.client}</h3>
                  <span className="chip"><Calendar className="w-3.5 h-3.5" /> {active.year}</span>
                  <span className="chip"><Clock className="w-3.5 h-3.5" /> {active.turnaround}</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="glass-thin rounded-2xl p-5">
                    <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Goal</div>
                    <p className="text-white/85 text-sm leading-relaxed">{active.goal}</p>
                  </div>
                  <div className="glass-thin rounded-2xl p-5">
                    <div className="text-xs uppercase tracking-widest text-white/50 mb-2 flex items-center gap-1"><Package className="w-3.5 h-3.5" /> Deliverables</div>
                    <p className="text-white/85 text-sm leading-relaxed">{active.deliverables}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a href="https://wa.me/919057281341" target="_blank" rel="noreferrer" className="btn btn-wa flex-1">
                    <WhatsAppGlyph className="w-4 h-4" /> Start a similar project
                  </a>
                  <button onClick={() => setActive(null)} className="btn btn-ghost">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromEvent = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <div
      ref={ref}
      className="glass rounded-[28px] p-3 select-none"
      onMouseMove={(e) => dragging.current && setFromEvent(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => setFromEvent(e.touches[0].clientX)}
    >
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
        {/* AFTER (full) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 20% 10%, #ff3ea5 0%, transparent 55%), radial-gradient(120% 90% at 90% 90%, #22d3ee 0%, transparent 55%), #0a0217',
          }}
        >
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <div className="font-display text-6xl sm:text-8xl">Verda.</div>
              <div className="text-white/80 mt-2 tracking-widest text-xs">CLEAN SKIN CO.</div>
              <div className="mt-6 flex gap-2 justify-center">
                <span className="chip !border-white/25">New arrivals</span>
                <span className="chip !border-white/25">Shop →</span>
              </div>
            </div>
          </div>
          <div className="absolute top-4 left-4 chip !bg-emerald-400/20 !border-emerald-300/40">After</div>
        </div>

        {/* BEFORE (clipped) */}
        <div
          className="absolute inset-0 bg-[#f5f1ea] text-black"
          style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}
        >
          <div className="absolute inset-0 grid place-items-center text-center px-4">
            <div>
              <div className="font-display text-5xl sm:text-6xl" style={{ fontFamily: 'Times New Roman, serif', fontWeight: 400 }}>Verda Skincare</div>
              <div className="text-black/60 mt-3 text-sm">natural products for your face</div>
              <div className="mt-6">
                <span className="inline-block px-4 py-2 rounded bg-black text-white text-xs">Enter site</span>
              </div>
            </div>
          </div>
          <div className="absolute top-4 left-4 chip !bg-black/70 !text-white !border-white/20">Before</div>
        </div>

        {/* handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/90 cursor-ew-resize"
          style={{ left: `calc(${pos}% - 2px)` }}
          onMouseDown={() => (dragging.current = true)}
          onTouchStart={() => (dragging.current = true)}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full glass-strong grid place-items-center">
            <span className="flex gap-0.5">
              <span className="w-1 h-4 bg-white rounded" />
              <span className="w-1 h-4 bg-white rounded" />
            </span>
          </div>
        </div>
      </div>
      <div className="px-3 py-3 text-xs text-white/60 flex items-center justify-between">
        <span>Verda Skincare · rebrand + landing page</span>
        <span>Drag the slider ↔</span>
      </div>
    </div>
  );
}
