const mongoose = require("mongoose");

// model step: 1
const eventModel = new mongoose.Schema(
        {
            title: {
                type: String, 
                trim: true,
            },
            creator: {
                type: String,
                trim: true,  
            },
            date:{
                type: Date,  
            },
            time:{
                type: String,  
            },
            description: {
                type: String,  
            },
            spacesAvailable:{
                type:Number,
                 
            },
            creator_name:{
                type:String, 
            },  
            status:{
                type: String,
                default:"active",
                enum:["active", "inactive"]
            },
            like:{
                type: Array, 
            },
            thumbs :{
                type:Array,
            },
            avatar:{
                type:String, 
            },
            eventChangeAt:Date, 
        } 
    );
 
     
module.exports = mongoose.model('event', eventModel)
