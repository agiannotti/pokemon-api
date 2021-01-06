require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./Error-handler');
const { handleGetTypes } = require('./getTypes');

const app = express();

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));

const API_TOKEN = process.env.API_TOKEN;

function validateBearerToken(req, res, next) {
  const authVal = req.get('Authorization') || '';
  // verify bearer token header
  if (!authVal.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing Bearer token' });
  }
  //verify token matches our secret
  // authVal === 'Bearer my-secret'

  const token = authVal.split(' ')[1];

  if (token !== API_TOKEN) {
    return res.status(401).json({ message: 'Invalid credential' });
  }
  //all validations passed move to next middleware in pipeline
  next();
}

app.get('/types', validateBearerToken, handleGetTypes);
app.get('/valid-types', handleGetTypes);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('Server listening at 8000');
});
