const userModels = require("../models/user.models");
const { generateToken } = require("../utils/token");
let bcrypt = require("bcryptjs");

//  response
const createUser = async (req, res) => {
  try {
    const newUser = req.body;

    console.log(newUser);
    const ExistingUser = await userModels.findOne({
      email: req.body.email,
    });

    if (ExistingUser) {
      return res.json({
        status: "error",
        message: `${req.body.email} User(email) already exists`,
      });
    }

    const user = await userModels.create(newUser);
    console.log(user);

    return res.status(200).json({
      user,
      status: "success",
      message: "User register success",
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
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
      return res.status(401).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }

    const isMatchPassword = await bcrypt.compareSync(password, user.password);
    if (!isMatchPassword) {
      return res.status(401).json({
        status: "error",
        message: "Password not match",
      });
    }

    console.log("isMatchPassword", isMatchPassword);
    if (user.status != "active") {
      return res.status(401).json({
        status: "error",
        message: "User is not active",
      });
    }

    const token = generateToken(user);

    // IGNORE PASSWORD
    const { password: pwd, ...others } = user.toObject();

    return res.status(200).send({
      status: "success",
      user: others,
      token,
      id: user._id,
      message: "User Login Successful",
    });
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages });
  }
};

const getAllUser = async (req, res) => {
  console.log("user", req.user);
  try {
    const user = await userModels.find({});

    return res.status(201).send(user);
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages });
  }
};

const getUsersScannedProducts = async (req, res) => {
  try {
    const user = await userModels
      .findOne({ _id: req.query.id })
      .select("scanned_products");
    return res.status(201).send(user?.scanned_products?.reverse());
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages });
  }
};

//   const updateUser= async (req , res) => {

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
    return res.status(401).json({ status: "error", message: error.massages });
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
    return res.status(401).json({ status: "error", message: error.massages });
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
    return res.status(401).json({ status: "error", message: error.massages });
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
    return res.status(401).json({ status: "error", message: error.massages });
  }
};


module.exports = {
  createUser,
  getUser,
  getAllUser,
  getUsersScannedProducts,
  getLeaderboardUser,
  addFriend,
  getUserFriends,
  removeFriend,
  getUserData,
  getUserFriendData,
  updateUserName,
  updateProfileImage
};
