import React, { Fragment } from "react";
import { Grid } from "@mui/material";

const Rewards = () => {
  return (
    <Fragment>
      <Grid item xs={12} md={12} lg={8}>
        <div className="main-page">
          <div className="container-fluid">
            <div className="page-title-div">
              <h2 className="title text-left">Rewards</h2>
            </div>
          </div>
        </div>
      </Grid>
    </Fragment>
  );
};

export default Rewards;
