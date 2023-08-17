import { Avatar, Box, Grid, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";

import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FriendList({ friend }) {
  const [status, setStatus] = useState(true);
  const [isFriend, setFriend] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/user/find/friend/${friend}`)
      .then((res) => {
        setFriend(res?.data);
        setStatus(false);
      });
  }, [friend]);

  return (
    <Fragment>
      {!status ? (
        <Grid item sx={12} lg={4} className="mt-1 p-2">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            replace
            to={"/profile"}
            state={{ data: isFriend }}
          >
            <Box className="text-left div-shadow">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={isFriend?.imgURL}
                  sx={{ bgcolor: "#8cbd20" }}
                  variant="rounded"
                >
                  {isFriend?.displayName[0]}
                </Avatar>

                <div style={{ marginLeft: 20}} >
                  <Typography variant="subtitle2">
                    {isFriend?.displayName}
                  </Typography>
                  <Typography variant="body2">{isFriend?.email}</Typography>
                  <Typography variant="body2" className="mt-2">
                    Points: {isFriend?.points ? isFriend?.points : 0}
                  </Typography>
                </div>
              </div>
            </Box>
          </Link>
        </Grid>
      ) : (
        <Grid item sx={12} lg={4} className="mt-1 p-2">
          <Box sx={{ width: 300 }} className="div-shadow w-100">
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        </Grid>
      )}
    </Fragment>
  );
}

export default FriendList;
