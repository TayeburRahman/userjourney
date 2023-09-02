
const admin = require("firebase-admin");
const { currentDateTime } = require('../services/currentdatetime');
let db = admin.firestore();
// const {  
//     v4: uuidv4
//   } = require('uuid');

const getUserProjects = async (req, res) => {
  try {
    const { user_email } = req.params

    let ProjectDB = db.collection('projects')
    const snapshot = await ProjectDB.get()
    const allList = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    const project = allList.filter((doc) => doc?.user_email === user_email)

    return res.status(201).json({
      project,
      status: "success",
      message: 'Project Get successfully'
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "server error" })
  }
}

const getAllUserProjects = async (req, res) => {
  try {
    let ProjectDB = db.collection('projects')
    const snapshot = await ProjectDB.get()
    const list = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    return res.status(201).json({
      project: list,
      status: "success",
      message: 'Project Get successfully'
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "server error" })
  }
}

const createProjects = async (req, res) => {
  try {
    const { formData } = req.body

    let ProjectDB = db.collection('projects')
    await ProjectDB.add(formData)

    return res.status(201).json({

      status: "success",
      message: 'Project Create successfully'
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "server error" })
  }
}

const updateProjects = async (req, res) => {
  try {
    const { formData } = req.body
    const { id } = req.params

    // console.log('data',formData, id)

    delete req.body.formData.id

    let ProjectDB = db.collection('projects')
    await ProjectDB.doc(id).update(formData)

    return res.status(201).json({
      status: "success",
      message: 'Project Update successfully'
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "server error" })
  }
}


const deleteProjects = async (req, res) => {
  try {
    const { id } = req.params

    let ProjectDB = db.collection('projects')
    await ProjectDB.doc(id).delete();

    return res.status(201).json({
      status: "success",
      message: 'Project delete successfully'
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "server error" })
  }
}


const getAdminCredits = async (req, res) => {
  try {
    let creditsRef = db.collection('credits')
    const creditsDb = await creditsRef.get();
    const credits = creditsDb?.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    return res.status(201).json({
      data: credits,
      status: "success",
      message: 'All Credits get successfully'
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "server error" })
  }
}

const getUsersCredits = async (req, res) => {
  try {

    const { email } = req.params

    let creditsRef = db.collection('credits')
    const creditsDb = await creditsRef.get();
    const credit = creditsDb?.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    const credits = credit.filter((doc) => doc?.author === email)

    return res.status(201).json({
      data: credits,
      status: "success",
      message: 'All Credits get successfully'
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "server error" })
  }
}

const addNewCredits = async (req, res) => {
  try {
    const body = req.body.formData
    const usersEmail = body?.account_name
    const { currentDateS, currentTimeS } = currentDateTime() 

    const { account_name: ac, status: st, ...others } = body?.project
    const creditsJson = {
      project_id: body?.project_id,
      project_name: body?.project_name,
      project: others,
      account_name: body?.account_name,
      date: currentDateS,
      time: currentTimeS,
      amount: body?.amount,
      author: body?.user_email,
      status: "active",
    };

    // console.log("filteredUsers", creditsJson)

    let usersRef = db.collection('users')
    const dataDB = await usersRef.get()
    const allUsers = dataDB?.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    const filteredUsers = allUsers?.filter(user =>
      usersEmail?.some(email => user?.email === email)
    );
 

    const updatedArray = filteredUsers?.map((obj) => {
      obj?.viewer.push(others);
      usersRef?.doc(obj?.id).update(obj)
      return obj;
    });

    console.log("usersEmail", updatedArray)

    const status = "active"
    let ProjectDB = db.collection('projects')

    console.log(body?.project_id)
    await ProjectDB.doc(body?.project_id).update({ status: status })

    let creditsRef = db.collection('credits')
    await creditsRef.add(creditsJson)

    return res.status(201).json({
      status: "success",
      message: 'Project delete successfully'
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "server error" })
  }
}

const deactivateCredits = async (req, res) => {
  try {
    const { id } = req.params
    const { account_name } = req.body.data
    const { project } = req.body.data;
    const targetId = project.id;

    let usersRef = db.collection('users');
    const ProjectDB = db.collection('projects')
    const creditsDB = db.collection('credits')
    const status = "panging"

    const dataDB = await usersRef.get();
    const allUsers = dataDB?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // ----------------------------------------
    const allAccount = [];
    for (const obj of allUsers) {
      if (account_name.includes(obj.email)) {
        allAccount.push(obj);
      }
    }
    // ------------------------------------
    allAccount.forEach(async (user) => {
      if (user.viewer !== undefined && Array.isArray(user.viewer)) {
        user.viewer = user.viewer.filter(viewerItem => viewerItem.id !== targetId);
        await usersRef.doc(user.id).update({ viewer: user.viewer });
        // console.log(`Document ${user.id} updated successfully.`);
      }
    });


    await creditsDB.doc(id).update({ status: status })

    const foundObjects = [];

    for (const item of allUsers) {
      const matchingObjects = item.viewer?.filter((view) => view.id === targetId);

      if (matchingObjects?.length > 0) {
        foundObjects.push(...matchingObjects);
      }
    }
 
    if (!foundObjects.length) {
      await ProjectDB.doc(targetId).update({ status: status })
    }


    return res.status(201).json({
      status: "success",
      message: 'Credits delete successfully'
    });

  } catch (error) {
    console.error("Error retrieving or updating documents: ", error);
  }


} 

const activateCredits = async (req, res) => {
  try {
    const body = req.body.data;
    const usersEmail = body?.account_name;
    const { id } = req.params;
    const project = body?.project;

    let usersRef = db.collection('users')
    const dataDB = await usersRef.get()
    const allUsers = dataDB?.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    const filteredUsers = allUsers?.filter(user =>
      usersEmail?.some(email => user?.email === email)
    ); 

    const updatedArray = filteredUsers?.map((obj) => {
      obj?.viewer.push(project);
      usersRef?.doc(obj?.id).update(obj)
      return obj;
    }); 

    const status = "active"
    let ProjectDB = db.collection('projects')
    let creditsRef = db.collection('credits')
    await ProjectDB.doc(body?.project_id).update({ status: status })
    await creditsRef.doc(id).update({ status: status })


    return res.status(201).json({
      status: "success",
      message: 'Project delete successfully'
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "server error" })
  }




}


const deleteCredits = async (req, res) => {

  try {
    const { id } = req.params
    const { creditsID } = req.params
    const emailArray = req.body.email

    const targetId = id;

    let usersRef = db.collection('users');
    const ProjectDB = db.collection('projects')
    const creditsDB = db.collection('credits')
    const status = "panging"

    const dataDB = await usersRef.get();
    const allUsers = dataDB?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // ----------------------------------------
    const allAccount = [];
    for (const obj of allUsers) {
      if (emailArray.includes(obj.email)) {
        allAccount.push(obj);
      }
    }
    // ------------------------------------
    allAccount.forEach(async (user) => {
      if (user.viewer !== undefined && Array.isArray(user.viewer)) {
        user.viewer = user.viewer.filter(viewerItem => viewerItem.id !== targetId);
        await usersRef.doc(user.id).update({ viewer: user.viewer });
        // console.log(`Document ${user.id} updated successfully.`);
      }
    }); 
   
    const foundObjects = []; 
    for (const item of allUsers) {
      const matchingObjects = item.viewer?.filter((view) => view.id === targetId);

      if (matchingObjects?.length > 0) {
        foundObjects.push(...matchingObjects);
      }
    }
 
    if (!foundObjects.length) {
      await ProjectDB.doc(targetId).update({ status: status })
    }


    await creditsDB.doc(creditsID).delete();

    return res.status(201).json({
      status: "success",
      message: 'Credits delete successfully'
    });


  } catch (error) {
    console.error("Error retrieving or updating documents: ", error);
  }

}

module.exports = { createProjects, updateProjects, getUserProjects, deleteProjects, getAllUserProjects, addNewCredits, getAdminCredits, deactivateCredits, deleteCredits, getUsersCredits, activateCredits }