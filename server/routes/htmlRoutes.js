const path = require('path');

module.exports = function(app) {
  app.get('/', async (req, res) => {
    console.log('GET request received at /');
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
};