const express = require('express');
const router = express.Router();


// Route for the homepage
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        header: 'Welcome to My Resume',
        body: '<h2>Home Page Content</h2>'
    });
});

// Route for the education page
router.get('/education', (req, res) => {
    res.render('education', {
        title: 'Education',
        header: 'Educational Details',
        body: '<h2>Educational Content</h2>'
    });
});

// Route for the contact page
router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact',
        header: 'Contact Us',
        body: '<h2>Contact Form</h2>'
    });
});
router.get('/customer-service', (req, res) => {
    res.render('customer-service', {
        title: 'Customer Service',
        header: 'Customer Service',
        body: '<h2>Customer Service Page Content</h2>'
    });
});

// Route for login page
router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        header: 'Login to Your Account',
        body: '<h2>Login Form</h2>'
    });
});

// Route for register page
router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        header: 'Create a New Account',
        body: '<h2>Register Form</h2>'
    });
});
router.get('/premium-info', (req, res) => {
    res.render('premium-info', {
        title: 'Premium Services',
        header: 'Premium Services Information'
    });
});


// Handle form submissions
router.post('/submit-form', (req, res) => {
    const { firstname, middlename, surname, email, address } = req.body;
    console.log('Form submitted:', { firstname, middlename, surname, email, address });
    res.redirect('/education');
});

router.post('/submit-contact', (req, res) => {
    const { phone, email, address } = req.body;
    console.log('Contact form submitted:', { phone, email, address });
    res.redirect('/');
});

module.exports = router;
