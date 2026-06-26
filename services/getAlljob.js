const { NotFoundError } = require("../errors")
const jobModel = require("../models/Job")
const format = require("./formatter")

const getAllJobsService = async (userData) => {
    const { id, name } = userData
    const jobs = await jobModel.find({ createdBy: id })
    if (jobs.length === 0){
        throw new NotFoundError(`No job found for ${format(name)}`)
    }

    const formattedJobs = format(jobs)
    return {formattedJobs, name}
}

module.exports = getAllJobsService