const {
  validateAccessToken,
  validateRefreshToken
} = require("./validate-tokens");
const User = require("../../models/user");
const { createAccessToken, createRefreshToken } = require("./auth");

const validateTokensMiddleware = async (req, res, next) => {
  const refreshToken = req.headers["x-refresh-token"];
  const accessToken = req.headers["x-access-token"];
  if (!accessToken && !refreshToken) return next();

  const decodedAccessToken = validateAccessToken(accessToken);
  if (decodedAccessToken && decodedAccessToken.user) {
    req.user = decodedAccessToken.user;
    return next();
  }

  const decodedRefreshToken = validateRefreshToken(refreshToken);
  if (decodedRefreshToken && decodedRefreshToken.user) {
    // valid refresh token
    const user = await User.findOne({ userId: decodedRefreshToken.user.id });
    // valid user and user token not invalidated
    if (!user || user.tokenCount !== decodedRefreshToken.user.count)
      return next();
    req.user = decodedRefreshToken.user;
    // refresh the tokens
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    // const userTokens = setTokens(user);
    res.set({
      "Access-Control-Expose-Headers": "x-access-token,x-refresh-token",
      "x-access-token": accessToken,
      "x-refresh-token": refreshToken
    });
    return next();
  }
  next();
}
module.exports ={ validateTokensMiddleware}