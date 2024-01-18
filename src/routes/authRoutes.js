// authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const sql = require('../../config/dbConfig.js');
const dashboardController = require('../controllers/dashboardController.js');

router.get('/', (req,res) => {
    res.render('index');
});

// Ruta para el registro
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    //Tomar el usuario y la contraseña del req
    const {username, password} = req.body;
    try{
        //Insertar el nuevo usuario a la BD
        const result = await sql.query`INSERT INTO Usuarios 
            (Usuario, Contraseña) VALUES 
            (${username}, ${password})`;

        //Redireccionar al login con un mensaje de éxito
        req.flash('successMessage', '¡Registro exitoso! Inicia sesión con tu nuevo usuario.');
        // Obtiene el mensaje flash
        const successMessage = req.flash('successMessage')[0];
        // Renderiza la vista de registro directamente con el mensaje flash
        res.render('register', { successMessage });
    } catch(err){
        console.error('Error al registrar el usuario: ', err);
        //Redireccionar al login con un mensaje de error
        req.flash('successMessage', '¡Upps! Parece que algo ha salido mal, vuelve a intentarlo.');
        // Obtiene el mensaje flash
        const successMessage = req.flash('successMessage')[0];
        res.render('register', { successMessage });
    }
})

// Ruta para el inicio de sesión
router.get('/login', (req, res) => {
    // Renderizar la página de inicio de sesión
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {
    console.log('Error de autenticación:', req.flash('error'));
    res.redirect('/login');
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            // Manejar cualquier error aquí
            console.error(err);
        }
        res.redirect('/login');
    });
});

// Ruta para ver el perfil del usuario
router.get('/profile', isAuthenticated, (req, res) => {
    // Acciones específicas del perfil
    res.render('profile', { user: req.user });
});

// Ruta para el panel principal después de iniciar sesión
router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        // Obtén el nombre de usuario del usuario autenticado
        const username = req.user.Usuario;
        // Asegúrate de que la primera letra esté en mayúscula
        const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
        const nivelesYSubniveles = await dashboardController.getNivelesYSubniveles();
        const formattedData = dashboardController.formatDataForDashboard(nivelesYSubniveles);
        const generatedHTML = await dashboardController.generateHTMLForDashboard(req, res, formattedData);
        const correctAnswersCount = req.session.correctAnswersCount || 0;
        req.session.correctAnswersCount = 0;
        res.render('dashboard', { user: { ...req.user, Usuario: formattedUsername }, generatedHTML, correctAnswersCount});
    } catch (error) {
        console.error('Error al cargar datos para el dashboard:', error);
        res.render('dashboard', { user: { ...req.user, Usuario: formattedUsername }, generatedHTML: '', correctAnswersCount});
    }
});


/*router.get('/questions', isAuthenticated, async (req, res) => {
    // Acciones específicas del questions
    //res.render('questions', { user: req.user });
    res.redirect('/questions/:subnivelId');
});*/

// Ruta para las preguntas
/*router.get('/questions/:subnivelId', isAuthenticated, async (req, res) => {
    try {
        const subNivelId = req.params.subnivelId;
        const preguntas = await questionsController.getPreguntasPorSubnivel(subNivelId);

        // Renderiza la página de preguntas con la información obtenida
        res.render('questions', { user: req.user, preguntas });
    } catch (error) {
        console.error('Error al cargar datos para la página de preguntas:', error);
        res.render('questions', { user: req.user, preguntas: [] });
    }
});*/

// Función de middleware para verificar autenticación
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;