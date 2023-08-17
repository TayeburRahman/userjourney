const eventsModels = require("../models/events.models")
 

//  response  
const createEvents = async (req, res ) => {  
 
    try { 
      const {title, date, time, description, spacesAvailable} = req.body?.formData    
      const {_id, displayName} = req.body?.user   
      const creator = _id
 
     
      let avatar = '' 
       if(req.file){
        avatar = req.file.path
      }  
    
  
     const event = await eventsModels.create({avatar,title,date, time,description,spacesAvailable, creator_name: displayName, creator})  
    
     return res.status(201).json({
      event,
      status: "success",
      message:'Event Create successfully'});
   } catch (error) {
     return res.status(500).json({status: "error", message: error})
   }
}

const updateEventsAvatar = async (req, res ) => {  
 
  try { 
    const {title, date, time, description, spacesAvailable} = req.body?.formData    
 
    const {ID} = req.params
 
   
    let avatar = '' 
     if(req.file){
      avatar = req.file.path
    }  
  

   const event = await eventsModels.updateOne({ _id: ID }, {$set: {avatar,title,date, time,description,spacesAvailable}})  
  
   return res.status(201).json({
    event,
    status: "success",
    message:'Event Create successfully'});
 } catch (error) {
   return res.status(500).json({status: "error", message: error})
 }
}

const updateEvents = async (req, res ) => {  
 
  try { 
    const {title, date, time, description, spacesAvailable} = req.body?.formData     
 
    const {ID} = req.params 

 


   const event = await eventsModels.updateOne({ _id : ID}, {$set: {title,date, time,description,spacesAvailable}})  
  
   return res.status(201).json({
    event,
    status: "success",
    message:'Event Create successfully'});
 } catch (error) {
   return res.status(500).json({status: "error", message: error})
 }
}

const getEvent = async (req, res ) => {  
 
  try { 
   const event = await eventsModels.find({}) 
 
   return res.status(200).json({
    event,
    status: "success",
    message:'Event Find successfully'});
 } catch (error) {
   return res.status(500).json({status: "error", message: error})
 }
}

const likeEvents = async (req, res) => {
  const { email , available} = req.body;
  try {
 

    const ExistingUser = await eventsModels.findOne({
      $and: [{ _id: req.params.ID}, { like: email }],
    });

    if (ExistingUser) {
      const response = await eventsModels.findOneAndUpdate(
        { _id: req.params.ID},
        {
          $pull: {
            like: email, 
          },
        },
       
        { returnOriginal: false }
      ); 
      const spaces  = await eventsModels.updateOne( { _id: req.params.ID }, { $set: { spacesAvailable: available +1} }); 

      return res.status(201).json({
        response, 
        status: "success",
        message: "Event Remove Like Success",
      });
    } else {
      const response = await eventsModels.findOneAndUpdate(
        { _id: req.params.ID},
        {
          $addToSet: {
            like: email, 
          },
        },
        { returnOriginal: false }
      ); 

      const spaces  = await eventsModels.updateOne( { _id: req.params.ID }, { $set: { spacesAvailable: available-1} }); 

      return res.status(200).json({
        response, 
        spaces,
        status: "success",
        message: "Event Add Like Success",
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

const likeExistingUser = async (req, res) => {
  try {
    const email = req.params.email;
    const id = req.params.ID;

    const exist = await eventsModels.findOne({
      $and: [{ _id: id }, { like: email }],
    });

    return res.status(200).json({
      exist,
      status: "success",
      message: "Find Success",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

const  getUserLikeEvent = async (req, res) => {
  const email = req.params.email

 
  try {
    const likeEvent = await eventsModels.find({like:{$exists: true}, like: email});
 
    return res.status(200).json({
      likeEvent,
      status: "success",
      message: "Find Success",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

const deleteEvent = async (req, res) => {
  const _id = req.params.ID 
  try {

    const event = await eventsModels.deleteOne({_id});
 
    return res.status(200).json({
      event,
      status: "success",
      message: "Find Success",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

 
 
  module.exports={  createEvents, getEvent, likeEvents, likeExistingUser, getUserLikeEvent, deleteEvent, updateEvents, updateEventsAvatar}