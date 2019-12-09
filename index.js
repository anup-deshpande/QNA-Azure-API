const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

// Import routes
const QnARoute = require('./routes/QnARoute');
const KBRoute = require('./routes/KBRoute');

// Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/knowledgebases', KBRoute);
app.use('/api',QnARoute);



app.listen(port, () => console.log('Server up and running'));

