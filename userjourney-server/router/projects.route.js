const { createProjects, updateProjects, getProjects, deleteProjects, getUserProjects, getAllProjects, getAllUserProjects, addNewCredits, getAdminCredits, deleteCredits, getUsersCredits, deactivateCredits, activateCredits } = require("../controllers/projects.controllers");
 
  
  const router = require("express").Router();
  
  router.route("/get_project/:user_email").get(getUserProjects);
  router.route("/get_project").get(getAllUserProjects);
  router.route("/new_project").post(createProjects);
  router.route("/update_project/:id").put(updateProjects);
  router.route("/delete/:id").delete(deleteProjects);
  router.route("/add/credits").post(addNewCredits);
  router.route("/admin/credits").get(getAdminCredits);
  router.route("/users/credits/:email").get(getUsersCredits);
  router.route("/delete/credits/:id/and/:creditsID").put(deleteCredits);
  router.route("/deactivate/:id").put(deactivateCredits);
  router.route("/inactivate/:id").put(activateCredits);

   
   

   

   

 
  
 
  
  
  module.exports = router;
  