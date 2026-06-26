const createJobService = require('./createJob')
const deleteJobService = require('./deleteJob')
const getAllJobsService = require('./getAlljob')
const getJobService = require('./getJob')
const updateJobService = require('./updateJob')

module.exports = {
    createJobService,
    getAllJobsService,
    getJobService,
    deleteJobService,
    updateJobService
}