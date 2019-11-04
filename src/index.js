require('dotenv').config();
const express = require('express')
const cors = require('cors');

const app = express()

// settings
const PORT = 4000
app.set('port', process.env.PORT || PORT)

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/posts', require('./routes/posts.routes'))
app.use('/api/tags', require('./routes/tags.routes'))

app.listen(app.get('port'), () => console.log(`BookMarc API is ON. PORT: ${app.get('port')}`));