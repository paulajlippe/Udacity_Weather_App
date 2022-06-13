const dotenv = require('dotenv');
dotenv.config();
module.exports.KEYS = {
    owKey: process.env.OW_KEY,
    mapToken: process.env.MAP_TOKEN
};