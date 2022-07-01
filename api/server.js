const express = require('express')
const app = express()
const smsRoutes = require('../routes/smsRoutes')
const mongo = require('../utils/mongo')

app.use(express.json())
mongo()
.then(() => console.log('Connected'))
.catch(err => console.log(err))

app.use('/api/v1/', smsRoutes)

app.get('/', (_, res) => {
    res.json("app works properly")
})

app.use('*', (_, res) => {
    res.json("wrong endpoint!")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(PORT))