const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Welcome to the Node.js backend!');
});

// Export the function to set routes
const setRoutes = (app) => {
    app.use('/', router);
};

module.exports = setRoutes;