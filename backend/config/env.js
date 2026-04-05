const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  port: process.env.PORT || 3000,
  openAIApiKey: process.env.OPENAI_API_KEY || ''
};
