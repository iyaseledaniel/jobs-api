const { BadRequestError, ConflictError } = require("../errors");
const jobModel = require("../models/Job");

const createJobService = async (jobData, userid) => {
    const { company, position } = jobData;

    // if (!userid){
    //     throw UnauthenticatedError("Not authorized");
    // }
    if (!company.trim() || !position.trim()) {
        throw new BadRequestError('Please provide company name and position')
    }
    const existingJob = await jobModel.findOne({ createdBy: userid, company: company.trim().toLowerCase() });
    if (existingJob) {
        throw new ConflictError("Job already exists")
    }
    const newJob = new jobModel({
        company: company.trim().toLowerCase(),
        position: position.trim().toLowerCase(),
        createdBy: userid
    });
    const jobCreated = await jobModel.create(newJob);

    return jobCreated
}
module.exports = createJobService;