const { config } = require('dotenv');
config();

module.exports = {
    port: process.env.PORT || 3000,
    email: process.env.EMAIL,
    publicVapidKey: process.env.PUBLIC_VAPID_KEY,
    privateVapidKey:process.env.PRIVATE_VAPID_KEY
};
