const express = require('express')
const morgan = require('morgan')
require('dotenv').config()


const app = express()
const PORT =  process.env.PORT || 3001

app.use(morgan('dev'))
app.use(express.json())

app.listen(PORT,()=>console.log(`listening on port ${PORT}`))