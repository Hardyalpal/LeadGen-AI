const path = require('path');
const express = require('express');
const { port } = require('./config/env');
const chatRouter = require('./routes/chat');

const app = express();

app.use(express.json());

// Serve static frontend assets
app.use(express.static(path.resolve(__dirname, '../frontend')));

// Serve generated CSV files
app.use('/downloads', express.static(path.resolve(__dirname, './downloads')));

// API routes
app.use('/chat', chatRouter);

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'LeadGen AI' });
});

app.listen(port, () => {
  console.log(`LeadGen AI server running at http://localhost:${port}`);
});
