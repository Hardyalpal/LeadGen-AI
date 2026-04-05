const fs = require('fs/promises');
const path = require('path');
const { createTimestampedFilename } = require('../utils/helpers');

/**
 * Escape CSV cells safely.
 * @param {unknown} value
 * @returns {string}
 */
function escapeCsvValue(value) {
  if (value === null || value === undefined) return '';
  const text = String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

/**
 * Convert JSON array into CSV and save to disk.
 * @param {Array<object>} rows
 * @returns {Promise<{ filename: string, filePath: string, urlPath: string }>}
 */
async function generateCsv(rows) {
  const downloadsDir = path.resolve(__dirname, '../downloads');
  await fs.mkdir(downloadsDir, { recursive: true });

  const filename = createTimestampedFilename('leads');
  const filePath = path.join(downloadsDir, filename);

  const headers = ['name', 'category', 'location', 'rating', 'phone', 'website', 'address'];
  const csvRows = [headers.join(',')];

  for (const row of rows) {
    const line = headers.map((h) => escapeCsvValue(row[h])).join(',');
    csvRows.push(line);
  }

  await fs.writeFile(filePath, csvRows.join('\n'), 'utf-8');

  return {
    filename,
    filePath,
    urlPath: `/downloads/${filename}`
  };
}

module.exports = {
  generateCsv
};
