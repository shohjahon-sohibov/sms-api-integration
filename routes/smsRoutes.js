const express = require('express')
const router = express.Router()

const { verifyPhoneNumber, getPhones } = require('../controllers/smsController')

router.post('/verify-phone', verifyPhoneNumber)
router.get('/all-sms', getPhones)

module.exports = router