const dataRoute = require('./sensor.route.js');
// const historyRoute = require('./history.route.js');

module.exports = (app) => {
    const version = '/api/v1';
    app.use(version + '/sensor', dataRoute);
    // app.use(version + '/history', historyRoute);
  };