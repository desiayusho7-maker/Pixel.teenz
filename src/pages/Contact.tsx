import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Instagram, Loader2, Mail, MapPin, Send } from 'lucide-react';
import Reveal from '../components/Reveal';
import { WhatsAppGlyph } from '../components/Layout';

type FAQ = { id: number; question: string; answer: string };

const SERVICES = ['Web Design', 'Brand Identity', 'Opening Video', 'Full package'];
const BUDGETS = ['Under ₹5k', '₹5k – ₹15k', '₹15k – ₹30k', '₹30k+', 'Not sure yet'];

export default function Contact() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [form, setForm] = useState({ name: '', brand: '', service: SERVICES[0], budget: BUDGETS[1], message: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    document.title = 'Contact — Pixelteenz';
    fetch('/api/faqs').then(r => r.json()).then((d) => { setFaqs(d); setOpenFaq(d[0]?.id ?? null); }).catch(() => {});
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) { setStatus('err'); setErrMsg('Please add your name and a short message.'); return; }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('ok');
      setForm({ name: '', brand: '', service: SERVICES[0], budget: BUDGETS[1], message: '', email: '' });
    } catch (err) {
      setStatus('err');
      setErrMsg('Something broke on our side. Ping us on WhatsApp instead.');
    }
  };

  return (
    <div className="px-4 sm:px-6">
      {/* HEADER */}
      <section className="mx-auto max-w-6xl pt-8 sm:pt-12 pb-10">
        <Reveal>
          <span className="chip mb-5"><Mail className="w-3.5 h-3.5" /> Say hi</span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95]">
            Let’s make<br />
            <span className="gradient-text">something loud.</span>
          </h1>
          <p className="mt-6 max-w-xl text-white/70">
            The fastest way to reach us is WhatsApp — usually replies within an hour. Prefer email vibes? Drop a message below.
          </p>
        </Reveal>
      </section>

      {/* QUICK CTAs */}
      <section className="mx-auto max-w-6xl pb-10">
        <div className="grid sm:grid-cols-2 gap-4">
          <Reveal>
            <a
              href="https://wa.me/919057281341"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-[28px] p-6 sm:p-8 flex items-center gap-5 group glass-hover"
            >
              <div className="w-14 h-14 rounded-2xl grid place-items-center shrink-0" style={{ background: 'linear-gradient(135deg, #4ef296, #12a94f)' }}>
                <WhatsAppGlyph className="w-7 h-7 text-black/85" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-white/50">WhatsApp</div>
                <div className="font-display text-2xl sm:text-3xl">+91 90572 81341</div>
                <div className="text-white/60 text-sm mt-1">Fastest replies · Mon–Sat, 10am–10pm IST</div>
              </div>
              <span className="chip group-hover:bg-white group-hover:text-black transition">Open chat</span>
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <a
              href="https://instagram.com/pixel.teenz"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-[28px] p-6 sm:p-8 flex items-center gap-5 group glass-hover"
            >
              <div className="w-14 h-14 rounded-2xl grid place-items-center shrink-0" style={{ background: 'linear-gradient(135deg, #ff3ea5, #7c5cff)' }}>
                <Instagram className="w-7 h-7 text-black/85" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-white/50">Instagram</div>
                <div className="font-display text-2xl sm:text-3xl">@pixel.teenz</div>
                <div className="text-white/60 text-sm mt-1">DMs open · See daily drops & work</div>
              </div>
              <span className="chip group-hover:bg-white group-hover:text-black transition">Follow</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="mx-auto max-w-6xl pb-16 sm:pb-24 grid lg:grid-cols-5 gap-6">
        <Reveal className="lg:col-span-3">
          <form onSubmit={submit} className="glass-strong rounded-[28px] p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-display text-2xl">Send a brief</div>
                <div className="text-white/60 text-sm">Takes ~60 seconds.</div>
              </div>
              <span className="chip">Encrypted</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Your name" required>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Aarav Sharma" className="field" />
              </Field>
              <Field label="Brand / project">
                <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Aurora Beats" className="field" />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Needed service">
                <Select value={form.service} onChange={(v) => setForm({ ...form, service: v })} options={SERVICES} />
              </Field>
              <Field label="Budget range">
                <Select value={form.budget} onChange={(v) => setForm({ ...form, budget: v })} options={BUDGETS} />
              </Field>
            </div>

            <Field label="Email (optional)">
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@brand.com" className="field" />
            </Field>

            <Field label="Tell us about the project" required>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What are you launching? Any references or vibes? Timeline?" rows={5} className="field resize-none" />
            </Field>

            <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
              <div className="text-xs text-white/50">By sending, you agree to be delighted.</div>
              <button type="submit" disabled={status === 'sending'} className="btn btn-primary">
                {status === 'sending' ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : status === 'ok' ? <><Check className="w-4 h-4" /> Sent</> : <><Send className="w-4 h-4" /> Send brief</>}
              </button>
            </div>

            <AnimatePresence>
              {status === 'ok' && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-thin rounded-2xl p-4 text-sm flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 text-emerald-300" />
                  <div>
                    <div className="font-medium">Got it — brief received.</div>
                    <div className="text-white/70">We’ll reply within a few hours. For faster replies, ping us on WhatsApp.</div>
                  </div>
                </motion.div>
              )}
              {status === 'err' && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-thin rounded-2xl p-4 text-sm text-rose-200 border border-rose-400/30">
                  {errMsg}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={0.1}>
          <div className="glass rounded-[28px] p-6 sm:p-8 h-full flex flex-col gap-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Where we’re based</div>
              <div className="flex items-center gap-2 text-lg"><MapPin className="w-4 h-4 text-white/60" /> India · Working worldwide</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Hours</div>
              <div>Mon – Sat · 10am – 10pm IST</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Payment</div>
              <div>UPI · Bank transfer · PayPal (INR / USD)</div>
            </div>
            <div className="flex-1" />
            <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,62,165,0.2), rgba(124,92,255,0.2), rgba(34,211,238,0.2))' }}>
              <div className="font-display text-xl mb-1">Prefer voice?</div>
              <div className="text-white/80 text-sm mb-3">Book a free 15-min discovery call on WhatsApp.</div>
              <a href="https://wa.me/919057281341" target="_blank" rel="noreferrer" className="btn btn-wa w-full">
                <WhatsAppGlyph className="w-4 h-4" /> Message on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl pb-24">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="chip mb-3">FAQ</span>
              <h2 className="font-display text-4xl sm:text-5xl">Questions?<br className="hidden sm:block" /> We’ve answered.</h2>
            </div>
          </div>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openFaq === f.id;
            return (
              <Reveal key={f.id} delay={i * 0.04}>
                <div className={`rounded-2xl overflow-hidden ${isOpen ? 'glass-strong' : 'glass'}`}>
                  <button onClick={() => setOpenFaq(isOpen ? null : f.id)} className="w-full text-left p-5 flex items-center gap-4">
                    <div className="flex-1 font-medium">{f.question}</div>
                    <span className={`w-9 h-9 rounded-full glass-thin grid place-items-center transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
                        <div className="px-5 pb-5 text-white/75 text-sm leading-relaxed max-w-2xl">{f.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* field styles */}
      <style>{`
        .field { width: 100%; padding: 0.85rem 1rem; border-radius: 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); color: white; font-size: 0.95rem; transition: border-color 0.2s, background 0.2s; }
        .field::placeholder { color: rgba(255,255,255,0.4); }
        .field:focus { outline: none; border-color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.08); }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-white/50 mb-1.5 block">
        {label}{required && <span className="text-rose-300">*</span>}
      </span>
      {children}
    </label>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} className="field text-left flex items-center justify-between">
        <span>{value}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-2xl p-1.5 z-20">
              {options.map(o => (
                <button type="button" key={o} onClick={() => { onChange(o); setOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl text-sm transition ${value === o ? 'bg-white/15' : 'hover:bg-white/10'}`}>
                  {o}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
