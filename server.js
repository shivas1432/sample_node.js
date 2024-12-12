const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your-secret-key-from-stripe');
const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
// Point to the correct views directory
app.set('views', path.join(__dirname, 'resources', 'views'));

// Set the static folder for serving CSS and other static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to handle JSON payloads

// Route handling
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Route for rendering the payment page
app.get('/payment', (req, res) => {
    res.render('payment', { title: 'Make Payment', header: 'Make Payment' });
});

// Route for handling the payment request
app.post('/charge', async (req, res) => {
    const { payment_method_id } = req.body;

    try {
        // Create a PaymentIntent with the amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000, // Amount in cents (e.g., $50.00)
            currency: 'usd',
            payment_method: payment_method_id,
            confirmation_method: 'manual',
            confirm: true,
        });

        res.json({ success: true });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
