// module `validate-tokens`
const { verify } = require("jsonwebtoken");

const validateAccessToken = (token) => {
  try {
    return verify(token, "<your secret key for access token>");
  } catch {
    return null;
  }
}

const validateRefreshToken = (token) => {
  try {
    return verify(token, "<your secret key for refresh token>");
  } catch {
    return null;
  }
}

module.exports = { validateAccessToken, validateRefreshToken }