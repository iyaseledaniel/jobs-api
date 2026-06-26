const express = require('express');
const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs');

const jobRouter = express.Router();

jobRouter.get('/', getAllJobs);
jobRouter.get('/:company', getJob);
jobRouter.post('/', createJob);
jobRouter.patch('/:company', updateJob);
jobRouter.delete('/:company', deleteJob);

module.exports = jobRouter;