const express = require('express');
const morgan = require('morgan');
const { renderFile } = require('ejs');
const path = require('path');

const { port } = require('./config/config');

// initializations
const app = express();

// settings
app.set('port', port);
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//local files
app.set('views', path.join(__dirname, 'views'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//engine views
app.set('view engine', 'ejs');
app.engine('html', renderFile);

// middlewares
app.use(morgan('dev'));

//routes
app.use(require('./routes/index.routes'));

module.exports = app;