const webpush = require('web-push');

const { email, publicVapidKey, privateVapidKey } = require('./config/config');

webpush.setVapidDetails(
    "mailto:" + email,
    publicVapidKey,
    privateVapidKey
);

module.exports = webpush;