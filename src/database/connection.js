const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.dbURI, config.options)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

module.exports = mongoose;
