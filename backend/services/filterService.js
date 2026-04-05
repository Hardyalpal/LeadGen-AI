/**
 * Apply business rules/filters to the scraped leads.
 * @param {Array<object>} leads
 * @param {{minRating?: number, noWebsite?: boolean}} filters
 * @returns {Array<object>}
 */
function filterLeads(leads, filters = {}) {
  const { minRating = 0, noWebsite = false } = filters;

  return leads.filter((lead) => {
    const passRating = Number(lead.rating || 0) >= minRating;
    const passWebsite = noWebsite ? !lead.website : true;
    return passRating && passWebsite;
  });
}

module.exports = {
  filterLeads
};
