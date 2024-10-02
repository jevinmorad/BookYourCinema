const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config()

const app = express()

connectDB();

app.use(cors());
app.use(express.json());

app.use('/user', require('./routes/user-route'));
app.use('/admin', require('./routes/admin-route'));
app.use('/movies', require('./routes/movie-route'));
app.use('/theaters', require('./routes/theater-route'));
app.use('/showtime',  require('./routes/showtime-route'));
app.use('/reservation',  require('./routes/reservation-route'));

const port = process.env.PORT
app.listen(port, ()=>{console.log(`Server running on port ${port}`);})