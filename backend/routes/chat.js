const express = require('express');
const { parseLeadQuery } = require('../services/aiService');
const { fetchLeads } = require('../services/scraperService');
const { filterLeads } = require('../services/filterService');
const { generateCsv } = require('../services/csvService');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid message.' });
    }

    const parsedQuery = await parseLeadQuery(message);
    const rawLeads = await fetchLeads(parsedQuery);
    const filteredLeads = filterLeads(rawLeads, parsedQuery.filters);
    const limitedLeads = filteredLeads.slice(0, parsedQuery.limit || 20);
    const csv = await generateCsv(limitedLeads);

    return res.json({
      success: true,
      parsedQuery,
      totalFound: limitedLeads.length,
      leads: limitedLeads,
      message: `Found ${limitedLeads.length} leads for ${parsedQuery.category} in ${parsedQuery.location}.`,
      downloadUrl: csv.urlPath
    });
  } catch (error) {
    console.error('Chat route error:', error);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong while generating leads.'
    });
  }
});

module.exports = router;
