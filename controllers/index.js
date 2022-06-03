// The funtion of this file is exports de controllers and they metho like a Object becasuse we use a class.
module.exports = {
    adminController: require('./admin.controllers'),
    indexControllers: require('./index.controllers'),
    AuthController: require('./auth.controllers')
};