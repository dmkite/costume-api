const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/costumes', require('./routes/costumes'))

app.use((res,req,next) => {
    res.status(404).send('Not found')
})

app.use((err, req, res, next) =>{
    let status = err.status || 500
    res.status(status).send(err)
})

const listener = () => console.log(`Party on port ${port}`)
app.listen(port, listener)

module.exports = app