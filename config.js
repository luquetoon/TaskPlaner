const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env') // development || production
});

module.exports = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    DB_USER: process.env.DB_USER || 'sergiTest',
    DB_PASS: process.env.DB_PASS || 'admin1234',
    DB_NAME: process.env.DB_NAME || 'TaskDB'
}