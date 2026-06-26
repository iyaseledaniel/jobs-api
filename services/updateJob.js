const { after, before } = require("node:test");
const { BadRequestError, NotFoundError } = require("../errors");
const jobModel = require("../models/Job");
const format = require("./formatter");


const updateJobService = async (reqData) => {
    const { body: { position, status }, user: { id, name }, params: { company } } = reqData;
    if (!position || !status) {
        throw new BadRequestError("Please provide position and status")
    }
    const updateData = {
        position: position.trim().toLowerCase(),
        status: status
    };
    const updatedJob = await jobModel.findOneAndUpdate({ company: company.trim().toLowerCase(), createdBy: id }, updateData,
        { returnDocument: "after", runValidators: true }
    );
    if (!updatedJob) {
        throw new NotFoundError(`${format(name)} has no job update for ${format(company)}`)
    }

    return { updatedJob, name }
}

module.exports = updateJobService