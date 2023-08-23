const userModels = require("../models/user.models");
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
    const user = req?.body;    
    const bearerToken = generateToken(user); 

    const newUser  = {
      email: user.email,
      name: user.name,  
      active: true,
      role: "user",
      token: bearerToken,
    }; 

      const { token, ...others } = newUser 
      console.log("newUser", "other", others)

      let usersDb = db.collection('users')
      let  userRes  =await usersDb.doc(req.body.email).set(others)  

       return res.status(200).json({
        response: userRes,
        data: newUser,
        status: "success",
        error: `Login Successfully`,
         
      }); 
 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error });
  }
};

/**
 1. Check if Email and password given
 2. Load user from database by email
 3. if not user send res Some message
 4. compare password
 5. if password not match send res Some message
 6. check if user is active
 7. if not active send res Some message
 8. generate token
 9. send user and token
 */

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
      otp: user?.otp,
      email: user?.email,
      active: user?.active,
      token: tokenGen
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
    const {formData} = req.body   
    const {email} = req.params

    console.log('data',formData, email)

    delete req.body.formData.email

    let ProjectDB = db.collection('users')
    await ProjectDB.doc(email).update(formData) 
  
   return res.status(201).json({ 
    status: "success",
    message:'Profile update successfully'});
 } catch (error) {
   return res.status(500).json({status: "error", message: "server error"})
 }
} 

const sendEmailForget = async (req, res) => {
  try {
    const {email} = req.body; 
    // console.log("email", email)

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





const getAllUser = async (req, res) => {
  console.log("user", req.user);
  try {
    const user = await userModels.find({});

    return res.status(201).send(user);
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
const getLeaderboardUser = async (req, res) => {
  try {
    const users = await userModels
      .find(
        {},
        { displayName: 1, imageURL: 1, _id: 1, points: 1, scanned_products: 1 }
      )
      .sort({ points: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addFriend = async (req, res) => {
  const { friendId, userId } = req.body;
  try {
    const result = await userModels.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          friends: friendId,
        },
      }
    );
    res.json({
      status: "success",
      message: "Friend added successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getUserFriends = async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await userModels.findOne(
      {
        _id: userId,
      },
      {
        friends: 1,
      }
    );
    res.json(result?.friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// function removeFriend
const removeFriend = async (req, res) => {
  const { friendId, userId } = req.body;
  try {
    const result = await userModels.updateOne(
      {
        _id: userId,
      },
      {
        $pull: {
          friends: friendId,
        },
      }
    );
    res.json({
      status: "success",
      message: "Friend removed ",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserData = async (req, res) => {
  try {
    const email = req.params;

    const user = await userModels.findOne(email);

    return res.status(201).send(user);
  } catch (error) {
    return res.json({ status: "error", message: error.massages });
  }
};

const getUserFriendData = async (req, res) => {
  try {
    const _id = req.params.ID;
    const friend = await userModels
      .findOne({ _id })
      .select(
        "displayName imageURL email _id points scanned_products like friends"
      );
    return res.status(201).send(friend);
  } catch (error) {
    return res.json({ status: "error", message: error.massages });
  }
};

const updateUserName = async (req, res) => {
  try {
    const _id = req.params.ID;
    const { displayName } = req.body.formData;

    console.log("_id", _id);

    const update = await userModels.updateOne(
      { _id },
      { $set: { displayName } }
    );

    console.log("update", update);

    return res.status(201).send(update);
  } catch (error) {
    return res.json({ status: "error", message: error.massages });
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const {email}= req.params;
 

    let avatar = '' 
    if(req.file){
     avatar = req.file.path
   }  

    const update = await userModels.updateOne({email},  { $set: { avatar } });

    console.log("update", update);

    return res.status(201).send(update);
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


  getLeaderboardUser,
  addFriend,
  getUserFriends,
  removeFriend,
  getUserData,
  getUserFriendData,
  updateUserName,
  updateProfileImage,
  googleAuthUser,
 
};
