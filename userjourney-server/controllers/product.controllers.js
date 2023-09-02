const admin = require("firebase-admin");
const { currentDateTime } = require("../services/currentdatetime");
let db=admin.firestore();

const createProduct = async (req, res ) => {  
 
    try { 
      const {product_name, product_details } = req.body?.formData     
     
      let avatar = '' 
       if(req.file){
        avatar = req.file.path
      }  

      const productData = {
        name: product_name,
        details: product_details,
        image: avatar,
      }

      let productDB = db.collection('products')
      await productDB.add(productData)  
    
     return res.status(201).json({
    
      status: "success",
      message:'Product Create successfully'});
   } catch (error) {
     return res.status(500).json({status: "error", message: error})
   }
}

const getProduct = async (req, res ) => {  
 
    try {   
        let productDB = db.collection('products')
        const snapshot = await productDB.get()  
        const list = snapshot?.docs.map((doc) => ({id: doc.id, ...doc.data()}))  
  
        return res.status(201).json({
         product: list,
        status: "success",
        message:'Project Get successfully'});
     } catch (error) {
       return res.status(500).json({status: "error", message: "server error"})
     }
}

const getSingleProduct = async (req, res ) => {  
    try {     
        const {id} = req.params  

        const productDB = db.collection("products").doc(id);
        const response = await productDB.get();
        const product = response.data()   
  
        return res.status(201).json({
         product: product,
        status: "success",
        message:'Project Get successfully'});
     } catch (error) {
       return res.status(500).json({status: "error", message: "server error"})
     }
}

const updateProduct = async (req, res ) => {  
 
    try { 
      const {product_name, product_details } = req.body?.formData     
      const {id} = req.params

      let productDB = db.collection('products')

      if(req.file){

        let avatar = '' 
        if(req.file){
         avatar = req.file.path
       }  

       const productData = {
        name: product_name,
        details: product_details,
        image: avatar,
      } 
       await productDB.doc(id).update(productData) 

       return res.status(201).json({ 
        status: "success",
        message:'Product Create successfully'});

      } 
      
      const productData = {
        name: product_name,
        details: product_details,
      }
 
      await productDB.doc(id).update(productData) 
    
     return res.status(201).json({ 
      status: "success",
      message:'Product Create successfully'});
   } catch (error) {
     return res.status(500).json({status: "error", message: error})
   }
}

const deleteProduct = async (req, res ) => {   
    try { 
      const {id} = req.params 

      let productDB = db.collection('products')
      await productDB.doc(id).delete(); 
    
     return res.status(201).json({ 
      status: "success",
      message:'Product delete successfully'});
   } catch (error) {
     return res.status(500).json({status: "error", message: "server error"})
   }
} 

const createSubscribe = async (req, res ) => {   
  try { 
    const subscribeData = req.body?.formData  

    const {currentDateS,currentTimeS} = currentDateTime()

    const data = {
      name: subscribeData.name, 
      email: subscribeData.email,
      time: currentDateS
  };

    let subscribeDB = db.collection('subscribe')
    await subscribeDB.add(data)  
  
   return res.status(201).json({ 
    status: "success",
    message:'Subscribe successfully'});
 } catch (error) {
   return res.status(500).json({status: "error", message: error})
 }
}

const getSubscribe = async (req, res ) => {   
  try { 
    
    const subscribeDB = db.collection("subscribe") 
    const snapshot = await subscribeDB.get()  
    const list = snapshot?.docs.map((doc) => ({id: doc.id, ...doc.data()}))  

    console.log('data',list)
   return res.status(201).json({ 
    subscribe: list,
    status: "success",
    message:'Subscribe successfully'});
 } catch (error) {
   return res.status(500).json({status: "error", message: error})
 }
}


module.exports = {
    createProduct,
    updateProduct,
    getProduct,
    getSingleProduct,
    deleteProduct,
    createSubscribe,
    getSubscribe,
}