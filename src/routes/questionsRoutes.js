const express = require('express');
const passport = require('passport');
const router = express.Router();
const questionsController = require('../controllers/questionsController.js');

// Rutas de preguntas
router.get('/:subnivelId/:numeroPregunta', isAuthenticated, async (req, res) => {
    try {
        const subNivelId = req.params.subnivelId;
        const numeroPregunta = req.params.numeroPregunta;
        const generarHTMLPregunta = await questionsController.generarHTMLPregunta(req, res, subNivelId, numeroPregunta);
        res.render('questions', { user: req.user, generarHTMLPregunta });
    } catch (error) {
        console.error('Error al cargar datos para la página de preguntas:', error);
        res.render('questions', { user: req.user, generarHTMLPregunta: '' });
    }
});

router.get('/', isAuthenticated, async (req, res) => {
    // Acciones específicas del questions
    //res.render('questions', { user: req.user });
    res.redirect('/dashboard');
});

// Nueva ruta para validar respuestas
router.post('/validate-answer/:answerId', isAuthenticated, async (req, res) =>{
    questionsController.validateAnswer(req, res);
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;