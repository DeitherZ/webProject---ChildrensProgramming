const express = require("express")
const router = express.Router()
const path = require("path");

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views/index.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views/register.html'));
});

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views/dashboard.html'));
});

router.get('/questions', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views/questions.html'));
});

module.exports = router