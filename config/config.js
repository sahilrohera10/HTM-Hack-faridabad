require("dotenv").config(); //instatiate environment variables

let CONFIG = {}; //Make this global to use all over the application

CONFIG.jwt_secret = process.env.JWT_SECRET;

module.exports = CONFIG;
