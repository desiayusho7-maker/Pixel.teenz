import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { name, brand, service, budget, message, email } = req.body || {};
      if (!name || !message) return res.status(400).json({ error: 'Name and message are required.' });

      const { data, error } = await supabase
        .from('contact_submissions')
        .insert({
          name: String(name).slice(0, 120),
          brand: brand ? String(brand).slice(0, 160) : null,
          service: service ? String(service).slice(0, 60) : null,
          budget: budget ? String(budget).slice(0, 60) : null,
          email: email ? String(email).slice(0, 200) : null,
          message: String(message).slice(0, 4000),
        })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json({ ok: true, id: data.id });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('contact api error:', err);
    res.status(500).json({ error: err.message });
  }
}
