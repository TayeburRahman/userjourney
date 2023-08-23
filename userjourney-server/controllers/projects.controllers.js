   const ProjectDB = require('../connection/config')
   const admin = require("firebase-admin");
   let db=admin.firestore();
// const {  
//     v4: uuidv4
//   } = require('uuid');

const getUserProjects = async (req, res ) => {   
    try {   
        const {project_email} = req.params   
       let ProjectDB = db.collection('projects')
      const snapshot = await ProjectDB.doc().get()  
      const list = snapshot?.docs.map((doc) =>  {
        mainDocs.push({ ...doc.data(), project_email })
        
      })
      console.log(list) 

      return res.status(201).json({
      project: list,
      status: "success",
      message:'Project Get successfully'});
   } catch (error) {
     return res.status(500).json({status: "error", message: "server error"})
   }
} 

const getAllUserProjects = async (req, res ) => {   
    try {   
      let ProjectDB = db.collection('projects')
      const snapshot = await ProjectDB.get()  
      const list = snapshot?.docs.map((doc) => ({id: doc.id, ...doc.data()}))  

      return res.status(201).json({
       project: list,
      status: "success",
      message:'Project Get successfully'});
   } catch (error) {
     return res.status(500).json({status: "error", message: "server error"})
   }
} 
  
 
const createProjects = async (req, res ) => {   
    try { 
      const {formData} = req.body   

      let ProjectDB = db.collection('projects')
      await ProjectDB.add(formData) 
    
     return res.status(201).json({
    
      status: "success",
      message:'Project Create successfully'});
   } catch (error) {
     return res.status(500).json({status: "error", message: "server error"})
   }
} 

const updateProjects = async (req, res ) => {   
    try { 
      const {formData} = req.body   
      const {id} = req.params

      // console.log('data',formData, id)

      delete req.body.formData.id

      let ProjectDB = db.collection('projects')
      await ProjectDB.doc(id).update(formData) 
    
     return res.status(201).json({ 
      status: "success",
      message:'Project Update successfully'});
   } catch (error) {
     return res.status(500).json({status: "error", message: "server error"})
   }
} 
 

const deleteProjects = async (req, res ) => {   
    try { 
      const {id} = req.params

      console.log("delete",id)

      let ProjectDB = db.collection('projects')
      await ProjectDB.doc(id).delete(); 
    
     return res.status(201).json({ 
      status: "success",
      message:'Project delete successfully'});
   } catch (error) {
     return res.status(500).json({status: "error", message: "server error"})
   }
} 


  module.exports={ createProjects, updateProjects, getUserProjects, deleteProjects, getAllUserProjects }