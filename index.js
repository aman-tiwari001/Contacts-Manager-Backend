const express = require('express');
const contactRouter = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5001;

connectDB(); // connect to mongodb

//Middlewares
app.use(express.json());
app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});