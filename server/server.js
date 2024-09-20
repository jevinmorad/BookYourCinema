const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()

connectDB();

app.use(express.json())

app.use('/movies', require('./routes/movie'));
app.use('/theaters', require('./routes/theater'));
app.use('/showtime',  require('./routes/showtime'));
app.use('/reservation',  require('./routes/reservation'));

const port = process.env.PORT
app.listen(port, ()=>{console.log(`Server running on port ${port}`);})