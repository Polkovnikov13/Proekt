const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  credentials: true,
  origin: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './../frontend/build/')));
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: false,
  },
}));
app.use('/api', require('./routes/mainRouter'));
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/camera', require('./routes/cameraRouter'));
app.use('/api/savelog', require('./routes/statusMaker'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../frontend/build/index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
