import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles, Zap, Wallet, Wand2, Layers, PenTool, Film, Star, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import Counter from '../components/Counter';
import { WhatsAppGlyph } from '../components/Layout';

type Portfolio = {
  id: number; slug: string; title: string; client: string; category: string; tagline: string;
  color_from: string; color_to: string; year: number;
};
type Testimonial = { id: number; quote: string; author: string; role: string; rating: number };

export default function Home() {
  const [work, setWork] = useState<Portfolio[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    document.title = 'Pixelteenz — Built by teens. Designed to steal attention.';
    fetch('/api/portfolio').then(r => r.json()).then(setWork).catch(() => {});
    fetch('/api/testimonials').then(r => r.json()).then(setTestimonials).catch(() => {});
  }, []);

  return (
    <div className="px-4 sm:px-6">
      {/* HERO */}
      <section className="mx-auto max-w-6xl pt-8 sm:pt-12 pb-16 sm:pb-24 relative">
        <Reveal>
          <div className="chip mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            Booking new brands — Q4 slots open
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <Reveal delay={0.05}>
              <h1 className="font-display text-[13vw] sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-tight">
                Built by teens.<br />
                <span className="gradient-text">Designed to steal attention.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-white/75 text-base sm:text-lg leading-relaxed">
                Pixelteenz is a teen-run creative studio building modern <b className="text-white">websites</b>, <b className="text-white">brand logos</b>, and cinematic <b className="text-white">opening videos</b> for brands that want to feel louder online — without the agency price tag.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="https://wa.me/919057281341" target="_blank" rel="noreferrer" className="btn btn-wa">
                  <WhatsAppGlyph className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
                <Link to="/work" className="btn btn-ghost">
                  See our work
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-4">
            <Reveal delay={0.35}>
              <TiltCard className="glass-strong rounded-[28px] p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="chip">Live preview</span>
                  <span className="text-xs text-white/50">v26 · glass</span>
                </div>
                <div
                  className="aspect-[4/5] rounded-2xl relative overflow-hidden"
                  style={{
                    background:
                      'radial-gradient(120% 80% at 20% 10%, #ff3ea5 0%, transparent 60%), radial-gradient(120% 80% at 90% 30%, #7c5cff 0%, transparent 55%), radial-gradient(140% 100% at 50% 100%, #22d3ee 0%, transparent 55%), #0a0217',
                  }}
                >
                  <div className="absolute inset-0 backdrop-blur-[2px]" />
                  <div className="absolute top-4 left-4 right-4">
                    <div className="glass rounded-2xl p-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white/50" />
                      <span className="w-2 h-2 rounded-full bg-white/50" />
                      <span className="w-2 h-2 rounded-full bg-white/50" />
                      <span className="ml-3 text-[10px] text-white/70">yourbrand.com</span>
                    </div>
                  </div>
                  <div className="absolute inset-x-4 top-20">
                    <div className="glass rounded-2xl p-4">
                      <div className="font-display text-2xl leading-none">Look. Feel. Sell.</div>
                      <div className="mt-2 text-[11px] text-white/70">A site that converts on the first scroll.</div>
                      <div className="mt-3 flex gap-2">
                        <span className="chip !bg-white !text-black !border-white">Buy now</span>
                        <span className="chip">Demo</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <div className="glass-thin rounded-xl p-2 flex-1 text-center text-[10px]">98/100</div>
                    <div className="glass-thin rounded-xl p-2 flex-1 text-center text-[10px]">A+ UI</div>
                    <div className="glass-thin rounded-xl p-2 flex-1 text-center text-[10px]">4d ship</div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>

        {/* Capabilities marquee */}
        <Reveal delay={0.4}>
          <div className="mt-14 marquee">
            <div className="marquee-track">
              {[...Array(2)].flatMap((_, i) =>
                ['Web design', 'Brand identity', 'Logo systems', 'Opening videos', 'Landing pages', 'Motion graphics', 'Instagram intros', 'YouTube brand kits', 'Portfolios'].map((c, j) => (
                  <span key={`${i}-${j}`} className="chip !py-2 !px-4 whitespace-nowrap text-[13px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    {c}
                  </span>
                ))
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-6xl pb-16 sm:pb-24">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="chip mb-3"><Star className="w-3.5 h-3.5" /> Why Pixelteenz</span>
              <h2 className="font-display text-4xl sm:text-5xl">Small studio energy.<br className="hidden sm:block" /> Big-brand output.</h2>
            </div>
            <p className="text-white/60 max-w-sm">We’re fast because we’re young. We’re good because we obsess. We’re affordable because we know what a first brand budget actually looks like.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {[
            { icon: Zap, label: 'Avg. turnaround', value: 72, suffix: 'h', color: 'from-[#ff3ea5] to-[#ffb547]' },
            { icon: Wallet, label: 'Starting from', value: 1999, prefix: '₹', color: 'from-[#22d3ee] to-[#7c5cff]' },
            { icon: Wand2, label: 'Custom design', value: 100, suffix: '%', color: 'from-[#baff45] to-[#22d3ee]' },
            { icon: Sparkles, label: 'Revisions', value: 3, suffix: 'x', color: 'from-[#7c5cff] to-[#ff3ea5]' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <TiltCard className="glass rounded-[24px] p-5 h-full glass-hover">
                <div className={`w-10 h-10 rounded-2xl mb-4 grid place-items-center bg-gradient-to-br ${s.color} shadow-lg`}>
                  <s.icon className="w-5 h-5 text-black/80" />
                </div>
                <div className="font-display text-3xl sm:text-4xl">
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">{s.label}</div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="mx-auto max-w-6xl pb-16 sm:pb-24">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="chip mb-3"><Layers className="w-3.5 h-3.5" /> What we do</span>
              <h2 className="font-display text-4xl sm:text-5xl">Three superpowers.<br className="hidden sm:block" /> One studio.</h2>
            </div>
            <Link to="/services" className="btn btn-ghost">All services <ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: PenTool, title: 'Web Design', body: 'Landing pages & small-business sites that convert on the first scroll.', from: '#ff3ea5', to: '#7c5cff' },
            { icon: Wand2, title: 'Brand Identity', body: 'Logos, marks, palettes and mini brand kits your future self won’t cringe at.', from: '#22d3ee', to: '#baff45' },
            { icon: Film, title: 'Opening Videos', body: 'Cinematic intros & motion IDs for YouTube, IG Reels, and brand launches.', from: '#ffb547', to: '#ff3ea5' },
          ].map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <TiltCard className="glass rounded-[28px] p-6 h-full glass-hover">
                <div
                  className="w-12 h-12 rounded-2xl grid place-items-center mb-5"
                  style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
                >
                  <s.icon className="w-6 h-6 text-black/85" />
                </div>
                <h3 className="font-display text-2xl mb-2">{s.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{s.body}</p>
                <Link to="/services" className="mt-6 inline-flex items-center gap-1 text-sm hoverline">Explore <ArrowRight className="w-3.5 h-3.5" /></Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WORK CAROUSEL */}
      <section className="mx-auto max-w-6xl pb-16 sm:pb-24">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="chip mb-3"><Star className="w-3.5 h-3.5" /> Featured work</span>
              <h2 className="font-display text-4xl sm:text-5xl">Recent drops.</h2>
            </div>
            <Link to="/work" className="btn btn-ghost">Full portfolio <ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </Reveal>

        <div className="marquee">
          <div className="marquee-track" style={{ animationDuration: '55s' }}>
            {(work.length ? [...work, ...work] : []).map((p, i) => (
              <div key={i} className="w-[260px] sm:w-[320px] flex-shrink-0">
                <TiltCard className="glass rounded-[24px] p-3 h-full">
                  <div
                    className="aspect-[4/5] rounded-2xl relative overflow-hidden mb-3"
                    style={{
                      background: `radial-gradient(120% 90% at 20% 10%, ${p.color_from} 0%, transparent 55%), radial-gradient(120% 90% at 90% 90%, ${p.color_to} 0%, transparent 55%), #0a0217`,
                    }}
                  >
                    <div className="absolute inset-3 rounded-xl border border-white/15 backdrop-blur-sm" />
                    <div className="absolute inset-0 grid place-items-center p-6 text-center">
                      <div>
                        <div className="font-display text-3xl sm:text-4xl leading-none">{p.title}</div>
                        <div className="mt-2 text-xs text-white/70">{p.tagline}</div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 chip">{p.category}</div>
                  </div>
                  <div className="flex items-center justify-between px-2 pb-2">
                    <div>
                      <div className="font-medium">{p.client}</div>
                      <div className="text-xs text-white/50">{p.year}</div>
                    </div>
                    <Link to="/work" className="w-9 h-9 rounded-full glass-thin grid place-items-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="mx-auto max-w-6xl pb-16 sm:pb-24">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="chip mb-3"><Wallet className="w-3.5 h-3.5" /> Real prices</span>
              <h2 className="font-display text-4xl sm:text-5xl">Priced like<br className="hidden sm:block" /> a first brand budget.</h2>
            </div>
            <Link to="/services" className="btn btn-ghost">Build a package <ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { name: 'Starter', price: 1999, tag: 'Logo only', bullets: ['Primary logo', 'Color palette', '2 revisions'], accent: 'from-white/30 to-white/5' },
            { name: 'Studio', price: 7999, tag: 'Most popular', bullets: ['Landing page + logo', 'Mini brand kit', '3 revisions', 'Deploy on Vercel'], accent: 'from-[#ff3ea5] to-[#7c5cff]', featured: true },
            { name: 'Launch', price: 14999, tag: 'Full drop', bullets: ['Site + brand + intro video', 'Full brand kit', 'Priority support'], accent: 'from-[#22d3ee] to-[#baff45]' },
          ].map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <TiltCard className={`rounded-[28px] p-6 h-full glass-hover ${t.featured ? 'glass-strong' : 'glass'}`}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-2xl">{t.name}</span>
                  <span className={`chip ${t.featured ? '!border-white/25' : ''}`}>{t.tag}</span>
                </div>
                <div className="flex items-end gap-1 mb-6">
                  <span className="font-display text-5xl"><Counter to={t.price} prefix="₹" /></span>
                  <span className="text-white/50 mb-1 text-sm">/ project</span>
                </div>
                <ul className="space-y-2 text-sm text-white/80 mb-6">
                  {t.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#ff3ea5] to-[#22d3ee]" />
                      {b}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/919057281341" target="_blank" rel="noreferrer" className={`btn w-full ${t.featured ? 'btn-primary' : 'btn-ghost'}`}>
                  Start on WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl pb-16 sm:pb-24">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="chip mb-3"><Instagram className="w-3.5 h-3.5" /> Loved by founders</span>
              <h2 className="font-display text-4xl sm:text-5xl">Kind words from<br className="hidden sm:block" /> not-so-shy clients.</h2>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass rounded-[24px] p-6 h-full"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  ))}
                </div>
                <p className="text-white/85 leading-relaxed">“{t.quote}”</p>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="font-medium">{t.author}</div>
                  <div className="text-xs text-white/50">{t.role}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl pb-24">
        <Reveal>
          <div className="glass-strong rounded-[32px] p-8 sm:p-14 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl bg-[#ff3ea5]/40" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl bg-[#22d3ee]/30" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="chip mb-3">Let’s cook</span>
                <h3 className="font-display text-3xl sm:text-5xl max-w-xl">Ready to make your brand un-scroll-past-able?</h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://wa.me/919057281341" target="_blank" rel="noreferrer" className="btn btn-wa">
                  <WhatsAppGlyph className="w-5 h-5" /> WhatsApp us
                </a>
                <Link to="/contact" className="btn btn-primary">Get a quote <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
