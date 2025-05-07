const mongoose = require('mongoose');
const config = require('./../../config.js');

const user = config.DB_USER;
const passwd = config.DB_PASS;
const dbname = config.DB_NAME;
const localURI = config.mongoURI || 'mongodb://localhost:27017/taskplanner';

const connectDB = async () => {
    try {
        let mongoURI;

        if (user && passwd) {
            mongoURI = `mongodb+srv://${user}:${passwd}@cluster0.gg0ncge.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`;
        } else {

            mongoURI = localURI;
        }

        await mongoose.connect(mongoURI);
        console.log(` Conectado a la base de datos: ${dbname || 'local'}`);
    } catch (error) {
        console.error(' Error al conectar con la base de datos:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
