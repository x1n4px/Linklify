const express = require('express');
const router = express.Router();
const {findOriginalUrl, shortenUrl } = require('../controllers/urlController');


router.get('/url/:shortCode',
    findOriginalUrl
)

router.post('/url',
    shortenUrl
)


module.exports = router;