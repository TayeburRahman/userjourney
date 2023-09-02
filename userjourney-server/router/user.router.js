const {
  createUser,
  getUser,  
  updateProfileImage,
  googleAuthUser,
  sendEmailForget,
  updateUserInfo,
  changeUserPassword,
  createSubUser,
  getSubUserList,
  updateSubUser,
  deleteMyUser,
  getAllUser,
  getSubUser,
  getSubUserDetails,
} = require("../controllers/user.controllers");
const upload = require("../middleware/uploadImage"); 

const router = require("express").Router();

router.route("/signup").post(createUser);
router.route("/auth").post(googleAuthUser);
router.route("/login").post(getUser);
router.route("/get/all").get(getAllUser); 
 
router.route("/forward/email").post(sendEmailForget);
router.route("/update/profile").put(updateUserInfo);
router.route("/update/password/:email").put(changeUserPassword);
router.route("/create/sub_user").post(createSubUser);
router.route("/sub_user").get(getSubUser);
router.route("/sub_user/:author").get(getSubUserList);
router.route("/sub_user/update/:email").put(updateSubUser);
router.route("/sub_user/delete/:id").delete(deleteMyUser);
router.route("/sub_user/details/:email").get(getSubUserDetails);

 

  

 

// router.route('/update/profile/:email').put(
//   upload.single("avatar"), 
//   updateProfileImage);  


module.exports = router;
