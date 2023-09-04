const express = require('express');
const https = require('https');
const fs = require('fs')
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
app.use('/all', require('./routes/mainRouter'));

const sslCertPath = '/etc/letsencrypt/live/polkovnikovdeveloper.ru/fullchain.pem';
const sslKeyPath = '/etc/letsencrypt/live/polkovnikovdeveloper.ru/privkey.pem';


const httpsOptions = {
  cert: fs.readFileSync(sslCertPath),
  key: fs.readFileSync(sslKeyPath),
};

const httpsServer = https.createServer(httpsOptions, app);



httpsServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
