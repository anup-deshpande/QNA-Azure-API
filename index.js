const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const verify = require('./verifyToken');
const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

// Import routes
const KBRoute = require('./routes/KBRoute');
const UserRoute = require('./routes/userRoutes');
const loginRoute = require('./routes/loginRoute');

// Connect to database
mongoose.connect(
process.env.DB_CONNECT,{ useNewUrlParser: true , useUnifiedTopology: true },() => 
    console.log('Connected to mongoDB!')
);

// Middleware
app.use(express.json());

// Route Middlewares without JWT verification
app.use('/api/knowledgebases', KBRoute);
app.use('/api/users', UserRoute);
app.use('/api/login', loginRoute);

// Route Middlewares with JWT verification
// app.use('/api/knowledgebases', verify, KBRoute);
// app.use('/api/users', UserRoute);
// app.use('/api/login', loginRoute);


app.listen(port, () => console.log('Server up and running'));

