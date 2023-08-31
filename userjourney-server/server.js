 
/* Init Server  */
const express = require("express");
const cors = require("cors");  
const mongoose = require('mongoose')
require("dotenv").config(); 
const port = process.env.PORT || 5000;
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

/* Set Middle wares */
app.use(cors());
app.use(express.json());
 
 
// Intialize the firebase-admin for store
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

 



/* Use Routes  */
app.use("/api/v1/user", require("./router/user.router"));
app.use('/api/v1/projects', require("./router/projects.route")); 
app.use('/api/v1/product', require("./router/product.router")); 
 
app.use("/uploads", express.static("./uploads"));


/* testing api  */
app.get("/", (req, res) => {
  res.send("Server is running");
});

 
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});

module.exports = app;