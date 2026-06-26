const { NotFoundError } = require("../errors");
const jobModel = require("../models/Job");
const format = require("./formatter");

const deleteJobService = async(userData)=>{
    const{user:{id,name},params:{company}}=userData

    const deletedJob = await jobModel.findOneAndDelete({createdBy:id, company:company});
    if(!deletedJob){
        throw new NotFoundError(`${format(name)} has no job with ${format(company)}`);
    }

    return company
}

module.exports= deleteJobService