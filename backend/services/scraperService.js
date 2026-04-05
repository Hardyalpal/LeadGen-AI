/**
 * Placeholder scraper service.
 * Later this can be replaced with real Google Maps scraper/API logic.
 * @param {{category: string, location: string, limit: number}} params
 * @returns {Promise<Array<object>>}
 */
async function fetchLeads(params) {
  const { category, location, limit } = params;

  // Mock dataset for MVP demo
  const mockLeads = [
    { name: 'SkinCare Clinic A', category, location, rating: 4.6, phone: '+91-900000001', website: '', address: 'Andheri, Mumbai' },
    { name: 'Derma Wellness Center', category, location, rating: 4.1, phone: '+91-900000002', website: 'https://dermawellness.example.com', address: 'Bandra, Mumbai' },
    { name: 'Glow Dermatology', category, location, rating: 4.8, phone: '+91-900000003', website: '', address: 'Powai, Mumbai' },
    { name: 'ClearSkin Experts', category, location, rating: 3.9, phone: '+91-900000004', website: '', address: 'Dadar, Mumbai' },
    { name: 'Elite Derma Care', category, location, rating: 4.3, phone: '+91-900000005', website: 'https://elitederma.example.com', address: 'Goregaon, Mumbai' },
    { name: 'Healthy Skin Hub', category, location, rating: 4.5, phone: '+91-900000006', website: '', address: 'Mulund, Mumbai' }
  ];

  const expanded = [];
  let idx = 0;
  while (expanded.length < limit) {
    const lead = mockLeads[idx % mockLeads.length];
    expanded.push({ ...lead, name: `${lead.name} ${Math.floor(idx / mockLeads.length) + 1}` });
    idx += 1;
  }

  return expanded;
}

module.exports = {
  fetchLeads
};
