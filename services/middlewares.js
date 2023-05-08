const { validateToken } = require("./authentication");

const checkAuthTokenInHeaders = (token) => {
  return (req, res, next) => {
    const authToken = req.cookies[token];
    if (authToken) {
      const payload = validateToken(authToken);
      req.user = payload;
      return next();
    } else {
      return next();
    }
  };
};

module.exports = { checkAuthTokenInHeaders };
