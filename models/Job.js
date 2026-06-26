const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company: {
        type:String,
        required: [true,'Please provide a comapny name'],
        maxlength: 50,
        unique:true
    },
    position:{
        type:String,
        required:[true,'Please provide a position'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['pending','interviewed','declined'],
        default: 'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    }
}, {timestamps:true});

const jobModel = mongoose.model("Job", jobSchema);

module.exports = jobModel