const {
  createUser,
  getUser, 
  getLeaderboardUser,
  addFriend,
  getUserFriends,
  removeFriend,
  getUserData, 
  getUserFriendData, 
  updateProfileImage,
  googleAuthUser,
  sendEmailForget,
} = require("../controllers/user.controllers");
const upload = require("../middleware/uploadImage"); 

const router = require("express").Router();

router.route("/signup").post(createUser);
router.route("/auth").post(googleAuthUser);
router.route("/login").post(getUser);
router.route("/forward/email").post(sendEmailForget);

  
router.route("/get_leaderboard_user").get(getLeaderboardUser);
router.route("/get_user_friends").post(getUserFriends);
router.route("/remove_friend").post(removeFriend);
router.route("/add_friend").post(addFriend);
router.route("/find/:email").get(getUserData);
router.route("/find/friend/:ID").get(getUserFriendData);

router.route('/update/profile/:email').put(
  upload.single("avatar"), 
  updateProfileImage);  


module.exports = router;
