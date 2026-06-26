const { NotFoundError } = require("../errors")
const jobModel = require("../models/Job")
const format = require("./formatter")


const getJobService = async(userData)=>{
    const {user:{id,name:userName}, params:{company}} = userData
    const job = await jobModel.findOne({company: company, createdBy: id})
    if (!job){
        throw new NotFoundError(`${format(userName)} does not have any job with ${format(company)}`)
    }
    const formattedJob = format(job);
    return {formattedJob, userName}
}

module.exports = getJobService;