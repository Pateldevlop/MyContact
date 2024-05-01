const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const port = process.env.PORT || 4000;

connectDb();

app.use(express.json());
app.use("/api/contacts", require('./routes/contactRoutes'));
app.use("/api/users", require('./routes/userRoutes'));
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});