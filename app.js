    const express = require('express');
    const morgan = require('morgan');
    const session = require('express-session');
    const passport = require('./config/passportConfig.js');
    const flash = require('connect-flash');
    const db = require('./config/dbConfig.js');
    const authRoutes = require('./src/routes/authRoutes.js');
    const questionsRoutes = require('./src/routes/questionsRoutes.js');
    const path = require("path");
    const app = express();
    const port = process.env.PORT;
    require('dotenv').config()
    app.use(morgan('dev'));

    // Configura el middleware para analizar el cuerpo de la solicitud
    app.use(express.urlencoded({ extended: true }));

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'src', 'views'));
    //Archivos estáticos
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    // Rutas de autenticación
    app.use('/', authRoutes);
    // Rutas relacionadas con preguntas
    app.use('/questions', questionsRoutes);

    // Iniciar el servidor
    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
