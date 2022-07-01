const express = require('express')
const router = express.Router()

const { verifyPhoneNumber, getPhones } = require('../controllers/smsController')

router.post('/api/verify-phone', verifyPhoneNumber.POST)
router.get('/api/all-sms', getPhones)

module.exports = router