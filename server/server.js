require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const path = require('path');


const app = express();

require('./config/passport')(passport);

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

app.use('/api/auth', require('./routes/auth'));
app.use('/uploads', express.static('uploads'));
app.use('/api/products', require('./routes/products'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
