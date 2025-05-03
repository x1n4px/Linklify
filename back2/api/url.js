const express = require('express');
const router = express.Router();
const { createClient } = require('@libsql/client');
const { v4: uuidv4 } = require('uuid');

const db = createClient({
    url: process.env.TURSO_DB_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

// Health Check Endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'API is working perfectly!',
        timestamp: new Date().toISOString(),
        dbStatus: process.env.TURSO_DB_URL ? 'Connected' : 'Not configured'
    });
});

// Test Endpoint
router.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint works!' });
});

// Obtener URL original
router.get('/:shortCode', async (req, res) => {
    try {
        res.status(200).json({
            status: 'OK',
            message: 'API is working perfectly!',
            timestamp: new Date().toISOString(),
            dbStatus: process.env.TURSO_DB_URL ? 'Connected' : 'Not configured'
        });
    } catch (error) {

        console.error('Error fetching URL:', error);
        res.status(500).json({
            status: 'Error',
            error: 'Failed to fetch URL',
            details: error.message,
            code: 'SERVER_ERROR'
        });
    }
});

/*
// Acortar URL
router.post('/shorten', async (req, res) => {
  try {
    const { original_url } = req.body;

    if (!original_url) {
      return res.status(400).json({ 
        status: 'Error',
        error: 'Original URL is required',
        code: 'MISSING_URL'
      });
    }

    const short_code = uuidv4().slice(0, 10);
    const now = new Date();
    const expires_at = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    await db.execute({
      sql: 'INSERT INTO short_urls (short_code, original_url, expires_at) VALUES (?, ?, ?)',
      args: [short_code, original_url, expires_at.toISOString()]
    });

    res.status(201).json({
      status: 'Created',
      short_code,
      original_url,
      expires_at,
      short_url: `${req.protocol}://${req.get('host')}/api/url/${short_code}`
    });
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ 
      status: 'Error',
      error: 'Failed to shorten URL',
      details: error.message,
      code: 'SERVER_ERROR'
    });
  }
});
*/

module.exports = router;