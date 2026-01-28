const express = require('express');

const router = express.Router();

// GET /user 라우터(/user와 /가 합쳐져서 GET /user/가 됨)
router.get('/', (req, res) => { 
    res.send('Hello, User');
});

module.exports = router;