const express= require('express');
const dotenv= require('dotenv').config();
const cors= require('cors')
const mongoose= require('mongoose')


mongoose.connect(process.env.MONGO_URL)
.then( () => console.log('DATABASE CONNECTED') )
.catch( (err) => console.log('DATABASE not connected', err) )

const app = express();

app.use('/', require('./routes/authRoutes'))

const port = 5000;

app.listen(port, () => console.log(`listening on port ${port}`));