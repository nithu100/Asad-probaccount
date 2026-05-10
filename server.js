const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Cashfree Credentials (Ye Render ke Dashboard par add karne honge)
const CF_CLIENT_ID = process.env.CF_CLIENT_ID;
const CF_CLIENT_SECRET = process.env.CF_CLIENT_SECRET;
const CF_ENVIRONMENT = "sandbox"; // Live ke liye "production" karein

app.post('/create-order', async (req, res) => {
    try {
        const { amount, customerEmail } = req.body;
        const response = await axios.post(
            `https://${CF_ENVIRONMENT}.cashfree.com/pg/orders`,
            {
                order_amount: amount,
                order_currency: "INR",
                customer_details: {
                    customer_id: "user_" + Math.floor(Math.random() * 1000000),
                    customer_email: customerEmail,
                    customer_phone: "9999999999"
                }
            },
            {
                headers: {
                    'x-client-id': CF_CLIENT_ID,
                    'x-client-secret': CF_CLIENT_SECRET,
                    'x-api-version': '2023-08-01'
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
