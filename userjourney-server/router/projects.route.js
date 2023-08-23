const { createProjects, updateProjects, getProjects, deleteProjects, getUserProjects, getAllProjects, getAllUserProjects } = require("../controllers/projects.controllers");
const { 
    getUser,  
    googleAuthUser,
    sendEmailForget,
  } = require("../controllers/user.controllers");
  
  const router = require("express").Router();
  
  router.route("/get_project/:project_email").get(getUserProjects);
  router.route("/get_project").get(getAllUserProjects);
  router.route("/new_project").post(createProjects);
  router.route("/update_project/:id").put(updateProjects);
  router.route("/delete/:id").delete(deleteProjects);

   

   

 
  
 
  
  
  module.exports = router;
  