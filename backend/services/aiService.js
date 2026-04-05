const OpenAI = require('openai');
const { openAIApiKey } = require('../config/env');

let client = null;
if (openAIApiKey) {
  client = new OpenAI({ apiKey: openAIApiKey });
}

/**
 * Fallback parser for when OpenAI API key is not provided.
 * @param {string} message
 * @returns {object}
 */
function mockParseQuery(message) {
  const lower = message.toLowerCase();

  const limitMatch = lower.match(/(\d+)/);
  const limit = limitMatch ? Number(limitMatch[1]) : 20;

  const ratingMatch = lower.match(/rating(?:s)?\s*(?:above|over|>=|greater than|at least)?\s*(\d(?:\.\d)?)/);
  const minRating = ratingMatch ? Number(ratingMatch[1]) : 4;

  const websiteRequired = !/(no website|without website)/.test(lower);

  // Naive category/location extraction for MVP
  const inParts = message.split(/\bin\b/i);
  let category = 'businesses';
  let location = 'India';

  if (inParts.length >= 2) {
    category = inParts[0]
      .replace(/find|show|get/gi, '')
      .replace(/\d+/g, '')
      .trim() || category;

    location = inParts[1]
      .replace(/with.*/i, '')
      .trim() || location;
  }

  return {
    category,
    location,
    limit,
    filters: {
      minRating,
      noWebsite: !websiteRequired
    }
  };
}

/**
 * Parse free-text user query into structured lead search params.
 * Uses OpenAI when API key is provided, otherwise mock parser.
 * @param {string} message
 * @returns {Promise<object>}
 */
async function parseLeadQuery(message) {
  if (!client) {
    return mockParseQuery(message);
  }

  const prompt = `Extract lead generation parameters from the query and return valid JSON only with this shape:\n{
  "category": "string",
  "location": "string",
  "limit": number,
  "filters": {
    "minRating": number,
    "noWebsite": boolean
  }
}\nIf not provided, use defaults: limit=20, minRating=0, noWebsite=false.\nQuery: ${message}`;

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages: [
      { role: 'system', content: 'You extract structured data for lead generation queries.' },
      { role: 'user', content: prompt }
    ]
  });

  const raw = completion.choices?.[0]?.message?.content || '{}';

  try {
    return JSON.parse(raw);
  } catch (error) {
    // Fallback to mock parser if AI returns non-JSON
    return mockParseQuery(message);
  }
}

module.exports = {
  parseLeadQuery
};
