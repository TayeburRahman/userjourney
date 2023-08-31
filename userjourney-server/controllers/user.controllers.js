
const { sendEmail } = require("../services/email.service");
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

    const userJson = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      otp: randomOTP,
      role: "user",
      active: false, 
      register_type: "register manual",
    };

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
    
    const projectName = reqData?.project_name;   
    const userEmail = reqData?.email;
 
     //  get and filter new add projects 
    // let projectRef = db.collection('projects')
    // const dataDB = await projectRef.get()  
    // const project = dataDB?.docs.map((doc) => ({id: doc.id, ...doc.data()})) 

    // const filteredProject = project?.filter(proj =>
    //   projectName?.some(color => proj?.project_name === color)
    // );   

   //  add user inset the projects 
    // const updatedArray = filteredProject?.map((obj) => {
    //   if (!obj.account_name.includes(userEmail)) {
    //     obj.account_name.push(userEmail);
    //     // obj.account.push(reqData);
    //   } 
    //   projectRef?.doc(obj?.id).update(obj) 
    //   return obj;
    // });
  

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
  //  check user if else exists   
    
    
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

    const userRef = db.collection("users").doc(email);
    const response = await userRef.get();
    const user = response.data()   

    // console.log("user", user)
    if(!user) { 
      console.log("userNo", user)  
      return res.json({
         status: "error",
         message: "Invalid email address"
        
      });
    }  
    //  sendEmail(email) 

     return res.status(200).send({
      status: "success",
      data: user, 
      message: "Check your email address",
    });
 
  } catch (error) {
    return res.json({ status: "error", message: error.massages });
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
// const getLeaderboardUser = async (req, res) => {
//   try {
//     const users = await userModels
//       .find(
//         {},
//         { displayName: 1, imageURL: 1, _id: 1, points: 1, scanned_products: 1 }
//       )
//       .sort({ points: -1 });
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const addFriend = async (req, res) => {
//   const { friendId, userId } = req.body;
//   try {
//     const result = await userModels.updateOne(
//       {
//         _id: userId,
//       },
//       {
//         $push: {
//           friends: friendId,
//         },
//       }
//     );
//     res.json({
//       status: "success",
//       message: "Friend added successfully",
//       result,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// const getUserFriends = async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const result = await userModels.findOne(
//       {
//         _id: userId,
//       },
//       {
//         friends: 1,
//       }
//     );
//     res.json(result?.friends);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// // function removeFriend
// const removeFriend = async (req, res) => {
//   const { friendId, userId } = req.body;
//   try {
//     const result = await userModels.updateOne(
//       {
//         _id: userId,
//       },
//       {
//         $pull: {
//           friends: friendId,
//         },
//       }
//     );
//     res.json({
//       status: "success",
//       message: "Friend removed ",
//       result,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const getUserData = async (req, res) => {
//   try {
//     const email = req.params;

//     const user = await userModels.findOne(email);

//     return res.status(201).send(user);
//   } catch (error) {
//     return res.json({ status: "error", message: error.massages });
//   }
// };

// const getUserFriendData = async (req, res) => {
//   try {
//     const _id = req.params.ID;
//     const friend = await userModels
//       .findOne({ _id })
//       .select(
//         "displayName imageURL email _id points scanned_products like friends"
//       );
//     return res.status(201).send(friend);
//   } catch (error) {
//     return res.json({ status: "error", message: error.massages });
//   }
// };

// const updateUserName = async (req, res) => {
//   try {
//     const _id = req.params.ID;
//     const { displayName } = req.body.formData;

//     console.log("_id", _id);

//     const update = await userModels.updateOne(
//       { _id },
//       { $set: { displayName } }
//     );

//     console.log("update", update);

//     return res.status(201).send(update);
//   } catch (error) {
//     return res.json({ status: "error", message: error.massages });
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


  // getLeaderboardUser,
  // addFriend,
  // getUserFriends,
  // removeFriend,
  // getUserData,
  // getUserFriendData,
  // updateUserName,
  updateProfileImage,
   
  
 
};
