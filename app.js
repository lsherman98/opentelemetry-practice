const PORT = process.env.PORT || '8080'
const express = require('express')
const { countAllRequests } = require('./monitoring')
const app = express()

app.use(countAllRequests())

const axios = require('axios')

app.get('/', (req, res) => {
    axios
        .get(`http://localhost:${PORT}/middle-tier`)
        .then(() => axios.get(`http://localhost:${PORT}/middle-tier`))
        .then(result => {
            res.send(result.data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send()
        })
})

app.get('/middle-tier', (req, res) => {
    axios
        .get(`http://localhost:${PORT}/backend`)
        .then(() => axios.get(`http://localhost:${PORT}/backend`))
        .then(result => {
            res.send(result.data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send()
        })
})

app.get('/backend', (req, res) => {
    res.send('Hello from the backend')
})


app.get('/date', (req, res) => {
    res.json({ today: new Date()})
})

app.listen(parseInt(PORT, 10), () => {
    console.log(`Listening for requests on http://localhost:${PORT}`)
})