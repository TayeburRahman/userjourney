const { getEvent, likeEvents, likeExistingUser, createEvents, getUserLikeEvent, deleteEvent, updateEvents, updateEventsAvatar } = require("../controllers/event.controllers");
 
const upload = require("../middleware/uploadImage"); 

const router = require("express").Router();

router.route('/creates').put(
    upload.single("avatar"), 
    createEvents);  

router.route('/update/:ID').put(updateEvents);  
router.route('/update/avatar/:ID').put(
    upload.single("avatar"), 
    updateEventsAvatar); 

     

router.route('/find').get(getEvent);
router.route('/likeEvent/:ID').put(likeEvents); 
router.route('/like/user/:ID/:email').get(likeExistingUser); 
router.route('/find/like/:email').get(getUserLikeEvent);
router.route('/delete/:ID').delete(deleteEvent);

 
// router.route('/getByAllAuthor').get(verifyToken,getAllUser);

module.exports = router;