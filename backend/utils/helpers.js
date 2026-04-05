/**
 * Build a safe filename with timestamp.
 * @param {string} prefix
 * @returns {string}
 */
function createTimestampedFilename(prefix = 'leads') {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${prefix}-${stamp}.csv`;
}

/**
 * Ensure value is treated as a number, with fallback.
 * @param {unknown} value
 * @param {number} fallback
 * @returns {number}
 */
function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

module.exports = {
  createTimestampedFilename,
  toNumber
};
