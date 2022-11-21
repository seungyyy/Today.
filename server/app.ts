const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: 'variables.env' });
const port = process.env.PORT || 5000;

app.listen(port, ()=> {
  console.log(port, 'server is open')
})
