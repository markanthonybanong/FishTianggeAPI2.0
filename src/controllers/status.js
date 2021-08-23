const httpStatusCode = require('http-status-codes');

module.exports = {
  get: (req, res) => {
    res.status(httpStatusCode.OK).send('Server is running');
  },
};
