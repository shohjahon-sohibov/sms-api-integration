const express = require('express')
const app = express()
const router = require('../routes')
const mongo = require('../utils/mongo')

app.use(express.json())
mongo()
.then(() => console.log('Connected'))
.catch(err => console.log(err))

app.use(router)

app.get('/', (_, res) => {
    res.json("app works properly")
})

// app.use('*', (_, res) => {
//     res.json("wrong endpoint!")
// })

const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(PORT))
