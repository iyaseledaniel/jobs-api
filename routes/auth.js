const express = require('express');
const { login, register } = require('../controllers/auth');
const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs');

const route = express.Router();

route.post('/register', register);
route.post('/login', login);

module.exports = route;