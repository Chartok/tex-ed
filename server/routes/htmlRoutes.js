const path = require('path');

module.exports = function (app) {
  try {
    app.get('/', async (req, res) => {
      console.log('GET request received at /');
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } catch (error) {
    console.error('There was an error in the request handler');
    throw error;
  }
};