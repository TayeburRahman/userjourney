import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLazyGetFriendListQuery } from "../../features/auth/authApi";

const Leaderboards = () => {
  const [users, setUsers] = React.useState([]);
  const { user, friendList } = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(false);
  const [getFriendList] = useLazyGetFriendListQuery();
  const addFriend = async (friendId) => {
    setLoading(true);
    try {
      await axios
        .post(`http://localhost:5000/api/v1/user/add_friend`, {
          friendId: friendId,
          userId: user?._id,
        })
        .then((res) => {
          toast(res.data?.message, {
            type: res.data?.status,
            toastId: res.data.message,
          });
          getFriendList({ userId: user._id });
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
 
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/user/get_leaderboard_user")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const navigate = useNavigate();




  
  return (
    <Fragment>
     
    </Fragment>
  );
};

export default Leaderboards;
