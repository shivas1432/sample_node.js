// Set your publishable key
const stripe = Stripe('your-publishable-key-from-stripe');
const elements = stripe.elements();

const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
const cardErrors = document.getElementById('card-errors');
const submitButton = document.getElementById('submit-button');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Disable the submit button to prevent multiple submissions
    submitButton.disabled = true;

    // Create a payment method
    const {paymentMethod, error} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (error) {
        // Display error.message in your UI.
        cardErrors.textContent = error.message;
        // Re-enable the submit button
        submitButton.disabled = false;
    } else {
        // Send the paymentMethod.id to your server
        fetch('/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payment_method_id: paymentMethod.id }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                // Display error.message in your UI
                cardErrors.textContent = data.error;
                // Re-enable the submit button
                submitButton.disabled = false;
            } else {
                // The payment was successful
                alert('Payment successful!');
                // Redirect or update UI
                window.location.href = '/success'; // Adjust according to your application
            }
        });
    }
});
