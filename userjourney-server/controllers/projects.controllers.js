 
const admin = require("firebase-admin");
const { currentDateTime } = require('../services/currentdatetime');
   let db=admin.firestore();
// const {  
//     v4: uuidv4
//   } = require('uuid');

const getUserProjects = async (req, res ) => {   
    try {   
      const {user_email} = req.params    

      let ProjectDB = db.collection('projects')
      const snapshot = await ProjectDB.get()  
      const allList = snapshot?.docs.map((doc) => ({id: doc.id, ...doc.data()}))   
    
       const project =  allList.filter((doc) => doc?.user_email === user_email)  

      return res.status(201).json({
      project,
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

      let ProjectDB = db.collection('projects')
      await ProjectDB.doc(id).delete(); 
    
     return res.status(201).json({ 
      status: "success",
      message:'Project delete successfully'});
   } catch (error) {
     return res.status(500).json({status: "error", message: "server error"})
   }
} 
 

const getAdminCredits = async (req, res ) => {   
  try {    
    let creditsRef = db.collection('credits') 
    const creditsDb = await creditsRef.get(); 
    const credits = creditsDb?.docs.map((doc) => ({id: doc.id, ...doc.data()}))  
  
   return res.status(201).json({ 
    data: credits,
    status: "success",
    message:'All Credits get successfully'});
 } catch (error) {
   return res.status(500).json({status: "error", message: "server error"})
 }
} 

const getUsersCredits = async (req, res ) => {   
  try {   
    
    const {email} = req.params    

    let creditsRef = db.collection('credits') 
    const creditsDb = await creditsRef.get(); 
    const credit = creditsDb?.docs.map((doc) => ({id: doc.id, ...doc.data()})) 

    const credits =  credit.filter((doc) => doc?.author === email)  

   return res.status(201).json({ 
    data: credits,
    status: "success",
    message:'All Credits get successfully'});
 } catch (error) {
   return res.status(500).json({status: "error", message: "server error"})
 }
}

const addNewCredits = async (req, res ) => {   
  try { 

    const body = req.body.formData  
    const usersEmail = body?.account_name  
    const {currentDateS,currentTimeS} = currentDateTime()


    const { account_name: ac,status: st, ...others } = body?.project 
    const creditsJson = {
      project_id: body?.project_id,
      project_name: body?.project_name,
      project: others, 
      account_name: body?.account_name,   
      date: currentDateS,
      time:currentTimeS,
      amount: body?.amount,  
      author: body?.user_email,
      status: "active", 
    };   
 
    // console.log("filteredUsers", creditsJson)

    let usersRef = db.collection('users')
    const dataDB = await usersRef.get()  
    const allUsers = dataDB?.docs.map((doc) => ({id: doc.id, ...doc.data()})) 

    const filteredUsers = allUsers?.filter(user =>
      usersEmail?.some(email => user?.email === email)
    );   
       const updatedArray = filteredUsers?.map((obj) => { 
          obj?.viewer.push(others); 
          usersRef?.doc(obj?.id).update(obj) 
        return obj;
      }); 

    let creditsRef = db.collection('credits')
    await creditsRef.add(creditsJson)  
  
   return res.status(201).json({ 
    status: "success",
    message:'Project delete successfully'});
 } catch (error) {
   return res.status(500).json({status: "error", message: "server error"})
 }
} 

const deactivateCredits= async (req, res ) => {    
    const {id} = req.params    
    const targetId  = id;
    const collectionRef =  db.collection('users')

    collectionRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
    
        // Check if the "viewer" field exists and is an array
        if (data.viewer !== undefined && Array.isArray(data.viewer)) {
          // Filter out objects with the target ID from the "viewer" array
          data.viewer = data.viewer.filter(viewerItem => viewerItem.id !== targetId);
    
          // Update the document with the modified "viewer" array
          doc.ref.update({ viewer: data.viewer }).then(() => {
            console.log(`Document ${doc.id} updated successfully.`);
          }).catch(error => {
            console.error(`Error updating document ${doc.id}: `, error);
          });
        } else {
          console.log(`Document ${doc.id} has no valid "viewer" field.`);
        }
      }); 
      return res.status(201).json({ 
        status: "success",
        message:'Credits deactivate successfully'});

    }).catch(error => {
      console.error("Error retrieving documents: ", error);
    });
    
 

  
}

const activateCredits= async (req, res ) => {    
  const {id} = req.params    
  const targetId  = id;
  const collectionRef =  db.collection('users')

  collectionRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
  
      // Check if the "viewer" field exists and is an array
      if (data.viewer !== undefined && Array.isArray(data.viewer)) {
        // Filter out objects with the target ID from the "viewer" array
        data.viewer = data.viewer.filter(viewerItem => viewerItem.id !== targetId);
  
        // Update the document with the modified "viewer" array
        doc.ref.update({ viewer: data.viewer }).then(() => {
          console.log(`Document ${doc.id} updated successfully.`);
        }).catch(error => {
          console.error(`Error updating document ${doc.id}: `, error);
        });
      } else {
        console.log(`Document ${doc.id} has no valid "viewer" field.`);
      }
    }); 
    return res.status(201).json({ 
      status: "success",
      message:'Credits deactivate successfully'});

  }).catch(error => {
    console.error("Error retrieving documents: ", error);
  }); 

}


const deleteCredits= async (req, res ) => {    
  const {id} = req.params  
  const {creditsID} = req.params   

  const targetId  = id;
  const collectionRef =  db.collection('users') 

  collectionRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
  
      // Check if the "viewer" field exists and is an array
      if (data.viewer !== undefined && Array.isArray(data.viewer)) {
        // Filter out objects with the target ID from the "viewer" array
        data.viewer = data.viewer.filter(viewerItem => viewerItem.id !== targetId);
  
        // Update the document with the modified "viewer" array
        doc.ref.update({ viewer: data.viewer }).then(() => {
          // console.log(`Document ${doc.id} updated successfully.`);
        }).catch(error => {
          // console.error(`Error updating document ${doc.id}: `, error);
        });
      } else {
        // console.log(`Document ${doc.id} has no valid "viewer" field.`);
      }
    }); 
 
    let creditsDB = db.collection('credits')
    creditsDB.doc(creditsID).delete(); 

    return res.status(201).json({ 
      status: "success",
      message:'Credits delete successfully'});

  }).catch(error => {
    console.error("Error retrieving documents: ", error);
  }); 
}

  module.exports={ createProjects, updateProjects, getUserProjects, deleteProjects, getAllUserProjects, addNewCredits, getAdminCredits, deactivateCredits, deleteCredits, getUsersCredits }