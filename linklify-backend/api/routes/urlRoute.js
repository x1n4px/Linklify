const express = require('express');
const router = express.Router();
const {findOriginalUrl, shortenUrl, healthCheck } = require('../controllers/urlController');

/*
router.get('/url/:shortCode',
    findOriginalUrl
)

router.post('/url',
    shortenUrl
)
*/
router.get('/health',
    healthCheck
)

module.exports = router;