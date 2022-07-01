require("dotenv").config()
const mongoose = require('mongoose')

const mongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log({ error: error.message });
    }
}

module.exports = mongo