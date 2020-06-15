const config = require('config');
const { sign } = require("jsonwebtoken");


const createAccessToken = ( user ) => {
  return sign({ userId: user.id }, config.get('ACCESS_TOKEN_SECRET'), {
    expiresIn: "15s"
  });
};

const createRefreshToken = ( user ) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    config.get('REFRESH_TOKEN_SECRET'),
    {
      expiresIn: "7d"
    }
  );
};

module.exports = { createAccessToken, createRefreshToken }