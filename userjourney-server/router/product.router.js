const { createProduct, updateProduct, getProduct, getSingleProduct, deleteProduct, createSubscribe, getSubscribe, createBroker, getAllBrokers, deleteBroker } = require("../controllers/product.controllers"); 


  const upload = require("../middleware/uploadImage"); 
  
  const router = require("express").Router();
  
  router.route("/new_product").post(upload.single("avatar"), createProduct);  
  router.route("/update_product/:id").put(upload.single("avatar"), updateProduct);  
  router.route("/get_product").get(getProduct);  
  router.route("/get_product/:id").get(getSingleProduct);
  router.route("/delete_product/:id").delete(deleteProduct);
  router.route("/add_subscribe").post(createSubscribe);
  router.route("/get_subscribe").get(getSubscribe);
  router.route("/add_broker").post(createBroker);
  router.route("/get_broker").get(getAllBrokers);
  router.route("/delete_broker/:id").delete(deleteBroker);
  
  
    
  
   
  
  // router.route('/update/profile/:email').put(
  //   upload.single("avatar"), 
  //   updateProfileImage);  
  
  
  module.exports = router;
  