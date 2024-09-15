const express = require('express');
const reportMiddleware = require('./middlewares/reportMiddleware');
const joyasRoutes = require('./routes/joyas');

const app = express();

app.use(express.json());
app.use(reportMiddleware); // Middleware para reportes
app.use('/joyas', joyasRoutes);

module.exports = app;
