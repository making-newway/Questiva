const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err))

const PORT = process.env.PORT || 5000;

const AuthRouter = require('./Routes/authRoute');
const QuesRouter = require('./Routes/questionRoute');

app.use('/user', AuthRouter);
app.use('/api', QuesRouter);

app.listen(PORT, () => {
    console.log(`server started at PORT ${PORT}`);
});