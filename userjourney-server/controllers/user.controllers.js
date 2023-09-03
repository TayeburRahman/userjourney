
const { sendMailWithGmail } = require("../services/email.service");
const { sendOtpWithGmail } = require("../services/otp.service");
const { generateToken } = require("../utils/token");
let bcrypt = require("bcryptjs");
const admin = require("firebase-admin");
let db=admin.firestore();
 

//  response
const createUser = async (req, res) => {
  try {
    const newUser = req.body;  
    let userRef = db.collection('users').doc(req.body.email)

    const userData = await userRef.get(newUser);
    const ExistingUser = userData.data() 

    if (ExistingUser?.active) {
      return res.json({
        status: "error",
        error: `${req.body.email} This User email already exists`,
      });
    }
    const randomOTP = Math.floor(Math.random() * 12345) + 11;

    const mailData = {
      to: req.body.email,
      subject: 'Verify your account',
      text1: 'Verify your email to sign up for peeppips',
      text2:"Please use the OTP below to login to your account. It is only valid for 10 minutes.",
      token: randomOTP
    }

    sendOtpWithGmail(mailData)

    const userJson = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      otp: randomOTP,
      role: "user",
      active: false, 
      register_type: "register manual",
    };

    if(ExistingUser.active === false) {
      let usersDB = db.collection('users')
      await usersDB.doc(req.body.email).delete(); 
    }

    const usersDb =  db.collection('users')
    await usersDb.doc(req.body.email).set(userJson) ;  

    const { password: pwt, ...others } = userJson

    return res.status(200).json({
      data: others,
      status: "success",
      message: "User register success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error });
  }
};

const otpChecker = async (req, res) => {
  try {
    const {otp} = req.body;  
    const {email} = req.params;  
    let userRef = db.collection('users')  
    const userData = await userRef.doc(email).get(); 
    const existingUser = userData.data()  

     const checkOtp = existingUser?.otp === otp? true : false

     if(checkOtp === false) {
      return res.status(404).json({ 
         status: "nomatch",
         message: "No match your OTP, Please check again !",
       });
     } 

    const userJson = { 
      otp:'verified', 
      active: true,  
    }; 
 
    await userRef.doc(email).update(userJson) ;   

    return res.status(200).json({ 
      status: "success",
      message: "OTP Match success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error });
  }
};

const googleAuthUser = async (req, res) => {
  try {
    const body = req?.body;    
    const bearerToken = generateToken(body); 

    const newUser  = {
      email: body.email,
      name: body.name,  
      active: true,
      role: "user",
      token: bearerToken,
      register_type: "google_authenticated",
      viewer: [],
    };   

      const { token, ...others } = newUser 

      let userRef = db.collection('users')
      const userDb =  await userRef.doc(body?.email).get()
      const ExistingUser = userDb.data()   

      if(ExistingUser){ 
        const resData = {
          email: ExistingUser?.email,
          name: ExistingUser?.name,  
          active: ExistingUser?.active,
          role: ExistingUser?.role,
          token: bearerToken,
          register_type: ExistingUser?.register_type,
          wp_num: ExistingUser?.wp_num,
          phone_num: ExistingUser?.phone_num,
          sub_users: ExistingUser?.sub_users,
        } 

       return res.status(200).json({ 
        data: resData,
        status: "success",
        error: `Login Successfully`,
         
        }); 

      } 
  
      await userRef.doc(req.body.email).set(others) ; 
       return res.status(200).json({ 
        data: newUser,
        status: "success",
        error: `Login Successfully`, 
      }); 
 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error });
  }
}; 

const getUser = async (req, res) => {
  try {
    const {email, password} = req.body; 
    if (! email || ! password) {
      return res.json({
        status: "error",
        message: "Email and password are required",
      });
    }

    const userRef = db.collection("users").doc(email);
    const response = await userRef.get();
    const user = response.data()   

    if (!user) {
      return res.json({
        status: "error",
        message: "User not found",
      });
    }

    // const isMatchPassword = await bcrypt.compareSync(password, user.password);

    const isMatchPassword =  password === user.password 
    if (!isMatchPassword) {
      return res.json({
        status: "error",
        message: "Password Is Wrong",
      });
    }

    if (!user.active) {
      return res.json({ 
        status: "error",
        message: "Email Is Invalided",
      });
    }

    const tokenGen = generateToken(user);   

    const sendUser = {
      role: user?.role,
      name: user?.name, 
      email: user?.email,
      active: user?.active,
      token: tokenGen,
      broker: user?.broker, 
      phone_num: user?.phone_num,
      wp_num:user?.phone_num,
      trading_account_number: user?.trading_account_number,
      customer: user?.customer_email, 
      register_type: user?.register_type,
    } 

    return res.status(200).send({
      status: "success",
      data: sendUser, 
      message: "User Login Successful",
    });
  } catch (error) {
    return res.json({ status: "error", message: error.massages });
  }
};

const updateUserInfo = async (req, res ) => {   
  try { 
    const data = req.body  
    const email = req.body.email    

    delete data.email 

    console.log("user",data)

    let userRef = db.collection('users')
    await userRef.doc(email).update(data) 

   const userDb =  await userRef.doc(email).get()
   const user = userDb.data()  
  
   return res.status(201).json({ 
    data: user,
    status: "success",
    message:'Profile update successfully'});
 } catch (error) {
   return res.status(500).json({status: "error", message: "server error"})
 }
} 

const changeUserPassword = async (req, res ) => {   
  try { 
    const {useData} = req.body  
    const {email} = req.params 

    let userRef = db.collection('users')
    const userDb =  await userRef.doc(email).get()
    const user = userDb.data()  

    if(user?.password === undefined){
       delete useData.current_pass 
       await userRef.doc(email).update(useData)  
       return res.status(201).json({  
        status: "success",
        message:'Password update successfully'});

    }

    if(user?.password !== useData?.current_pass ){ 
      console.log("user pass not match", useData)
      return res.status(400).json({ 
        // data: user,
        status: "error",
        message:'Current Password is incorrect, please try again'});
    } 

 
    delete useData.current_pass 
    await userRef.doc(email).update(useData)   
    console.log("user success" )
  
    return res.status(201).json({  
      status: "success",
      message:'Password update successfully'}); 
      
 } catch (error) {
   return res.status(500).json({status: "error", message: "server error"})
 }
}  

const createSubUser = async (req, res) => {
  try { 
    const reqData = req.body.formData;    
    
    let userRef = db.collection('users')
    const userData = await userRef.doc(reqData?.email).get();
    const ExistingUser = userData.data()   
    
    if (ExistingUser?.active === true) { 
      return res.status(409).json({
        status: "error",
        error: `${reqData?.email} This user email already exists`,
      });
    }
 

    const userJson = {
      project_name: reqData?.project_name,
      name: reqData?.name,
      password: reqData?.password, 
      email: reqData?.email,   
      phone_num: reqData?.phone_num,
      broker: reqData?.broker, 
      trading_account_number: reqData?.trading_account_number,
      author: reqData?.customer_email,
      role: "sub_user",
      active: true, 
      register_type: "add_author.U", 
      viewer: [],
    };   
    

    // user register on database 
    const usersDb =  db.collection('users')
    await usersDb.doc(reqData?.email).set(userJson) ;  

    const { password: pwt, ...others } = userJson 

    return res.status(200).json({
      data: others,
      status: "success",
      message: "User add successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error });
  }
};   

const updateSubUser = async (req, res) => { 

  try { 
    const reqData = req.body.formData;   
    
    const userJson = {
      project_name: reqData?.project_name,
      name: reqData?.name,
      password: reqData?.password, 
      email: reqData?.email,   
      phone_num: reqData?.phone_num,
      broker: reqData?.broker, 
      trading_account_number: reqData?.trading_account_number, 
    };   
    

    // user register on database 
    const usersDb =  db.collection('users')
    await usersDb.doc(reqData?.email).update(userJson) ;  

    const { password: pwt, ...others } = userJson 

    return res.status(200).json({
      data: others,
      status: "success",
      message: "User add successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error });
  }
    
 
};   

const getSubUserList = async (req, res) => {
  try {
    const {author} = req.params;  
 
     const userRef = db.collection("users");
     const response = await userRef.get(); 
     const userDb = response?.docs.map((doc) => ({id: doc.id, ...doc.data()}))  
  
      const userList = userDb?.filter((doc) => author === doc.author)   
 

    return res.status(200).send({
      status: "success",
      users: userList, 
      message: "successfully get data for author",
    });
  } catch (error) {
    return res.json({ status: "error", message: error.massages });
  }
};

const getSubUser = async (req, res ) => {   
  try { 
 
    const userRef = db.collection("users");
    const response = await userRef.get(); 
    const userDb = response?.docs.map((doc) => ({id: doc.id, ...doc.data()}))   
    const userList = userDb?.filter((doc) => doc?.role === "sub_user")    

   return res.status(201).json({ 
    status: "success",
    users: userList, 
    message: "successfully get data for author",
  });
 } catch (error) {
   return res.status(500).json({status: "error", message: "server error"})
 }
} 

const getSubUserDetails = async (req, res) => {
  try {
    const {email} = req.params;  
 
     const userRef = db.collection("users");
     const response = await userRef.doc(email).get();  
     const productDB = response.data()   
     
     console.log(productDB)

     const project = productDB.viewer
 

    return res.status(200).send({
      status: "success",
      project: project, 
      message: "successfully get data for author",
    });
  } catch (error) {
    return res.json({ status: "error", message: error.massages });
  }
};


const deleteMyUser = async (req, res ) => {   
  try { 
    const {id} = req.params 
    console.log("delete", id)

    let usersDB = db.collection('users')
    await usersDB.doc(id).delete(); 
  
   return res.status(201).json({ 
    status: "success",
    message:'Project delete successfully'});
 } catch (error) {
   return res.status(500).json({status: "error", message: "server error"})
 }
} 

const getAllUser = async (req, res) => { 
  try {
    const userRef = db.collection("users");
     const response = await userRef.get(); 
     const userDb = response?.docs.map((doc) => ({id: doc.id, ...doc.data()}))  

    return res.status(201).send(userDb);
  } catch (error) {
    return res.json({ status: "error", message: error.massages });
  }
};

 
const sendEmailForget = async (req, res) => { 
  try {
    const {email} = req.body; 
    console.log("email", email)

    const userRef = db.collection("users") ;
    const response = await userRef.doc(email).get();
    const user = response.data()   
    const { token, password, ...others } = user 

    // console.log("user", user)
    if(!user) {  
      return res.json({
         status: "error",
         message: "Invalid email address, Please type your account email !"
        
      });
    }  

    const tokenGen = generateToken(user);   

    const mailData = {
      to: req.body.email,
      subject: 'Password Reset Request',
      text1: `Dear ${user?.name},`,
      text2:"We received a request to reset the password for your account at peeppips. To proceed with resetting your password, please click on the following link:", 
      token: tokenGen,
    }

    sendMailWithGmail(mailData)
 
     return res.status(200).send({
      data: others,
      status: "success", 
      message: "Check your email address",
    });
 
  } catch (error) {
    return res.json({ status: "error", message: error.massages });
  }
};   

const changePassword = async (req, res) => {
  try {
    const {password} = req.body;  
    const {email} = req.params;   

    let userRef = db.collection('users')      

    const userJson = { 
      password: password,  
    };  
 
    await userRef.doc(email).update(userJson) ;   
    console.log("password", userJson, email);

    return res.status(200).json({ 
      status: "success",
      message: "Password change success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error });
  }
};
 




 

 

//   try {
//        await userModel.updateOne({
//          email: req.params.email
//         },
//           req.body
//       );
//       res.status(201).json({massages:'Card Updated Successfully'});
//   } catch (error) {
//       return res
//           .status(500).json({massages: error.massages})
//   }
// };
 

const updateProfileImage = async (req, res) => {
  try {
    const {email}= req.params;
 

    let avatar = '' 
    if(req.file){
     avatar = req.file.path
   }  

    // const update = await userModels.updateOne({email},  { $set: { avatar } });

    // console.log("update", update);

    // return res.status(201).send(update);
  } catch (error) {
    return res.json({ status: "error", message: error.massages });
  }
};


module.exports = {
  createUser,
  getUser,
  getAllUser, 
  sendEmailForget,
  updateUserInfo,
  changeUserPassword,
  googleAuthUser,
  createSubUser,
  getSubUserList,
  updateSubUser,
  deleteMyUser,
  getSubUser,
  getSubUserDetails, 
  otpChecker,
  updateProfileImage, 
  changePassword,
 
};
