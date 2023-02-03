const router = require('express').Router();
const { fetchData } = require('../controllers/companyRanking.controller.js');
router.post('/api/save', fetchData);
module.exports = router;
