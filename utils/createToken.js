const jwt = require('jsonwebtoken');
require("dotenv").config();

const createToken = (payload) =>{
  let token = jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: '60d',
  });
  return token
}

module.exports = createToken;
