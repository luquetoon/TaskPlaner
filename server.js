const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const connectDB = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
const config = require('./config');
const path = require('path');

const app = express();
const port = config.port || 3000; // Usa el puerto de config o 3000

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión',
            version: '1.0.0',
            description: 'API para gestionar usuarios y productos con MongoDB',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Servidor de desarrollo',
            },
        ],
    },
    apis: [
        './src/routes/*.js',
        './src/models/*.js'
    ],
};

const specs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors());
app.use(express.json());

// CORS manual (opcional, si ya usas `cors()`)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tasks', taskRoutes);


app.use(errorHandler);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Conexión a la base de datos
connectDB();

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
