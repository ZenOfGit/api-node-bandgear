const express = require('express');
const morgan = require('morgan');
const mssql = require('mssql');

const app = express();

const cors = require('./middleware/cors');
const Country = require('./models/country');
const dboperations = require('./dboperatons');

const countryRoutes = require('./api/routes/countries');
const userRoutes = require('./api/routes/users');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Here we call a function from dboerrations the data from the db and log it into the console
dboperations.getCountriess().then(result => {
   console.log(result);
})


app.use(cors.enableCORS);

app.use('/api/countries', countryRoutes);
app.use('/users', userRoutes);
app.use((req, res, next) => {
   const error = new Error('not Found');
   error.status= 404;
   next(error);
});
app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
      error: {
         message: error.message
      }
   });
});

module.exports = app;