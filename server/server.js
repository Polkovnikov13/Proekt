const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

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
app.use('/api', require('./routes/mainRouter'));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './../frontend/build/index.html'));
// });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
