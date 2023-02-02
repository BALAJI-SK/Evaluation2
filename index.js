//import express from 'express';
const express = require('express');
const app = express();
const port = 3000;
const routes = require('./src/routes/routes.js');
app.use(express.json());
app.use('/', routes);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});