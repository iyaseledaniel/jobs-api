const asyncWrapper = require('../middleware/async');
const { createJobService, getAllJobsService, getJobService, deleteJobService, updateJobService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const jobModel = require('../models/Job');
const { BadRequestError, UnauthenticatedError, ConflictError } = require('../errors');
const format = require('../services/formatter')

const createJob = asyncWrapper(async (req, res, next) => {
    const userid = req.user.id
    const {formattedJob: job} = await createJobService(req.body, userid)
    res.status(StatusCodes.CREATED).json({ msg: 'Job created', job });
});


const getAllJobs = asyncWrapper(async (req, res, next) => {
    const { formattedJobs, name } = await getAllJobsService(req.user);
    res.status(StatusCodes.OK).json({ User: format(name), Jobs: formattedJobs, nBJobs: formattedJobs.length })
});


const getJob = asyncWrapper(async (req, res, next) => {
    const { formattedJob: job, userName } = await getJobService(req);
    res.status(StatusCodes.OK).json({ User: format(userName), job });
});

const updateJob = asyncWrapper(async (req, res, next) => {
    const { updatedJob, name } = await updateJobService(req);
    res.status(StatusCodes.OK).json({ msg: `job updated successfully by ${format(name)}`, job:format(updatedJob)});
});

const deleteJob = asyncWrapper(async (req, res, next) => {
    const deletedJob = await deleteJobService(req);
    res.status(StatusCodes.OK).json({ msg: `${format(deletedJob)} job has been deleted` });
});

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}