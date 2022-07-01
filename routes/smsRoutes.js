const express = require('express')
const router = express.Router()

const { verifyPhoneNumber } = require('../controllers/smsController')

router.post('/verify-phone', verifyPhoneNumber)

module.exports = router