const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();


// Import routes
const QnARoute = require('./routes/QnARoute');

// Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/question',QnARoute);

app.listen(port, () => console.log('Server up and running'));

