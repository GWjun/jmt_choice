// Profile.tsx

import * as React from "react";
import { useAuth } from "../../context/AuthContext";
import "../../utils/font.css";

import Page from "../../components/Page";
import Title from "../../components/Title";

import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Profile: React.FC = () => {
  const { auth } = useAuth();

  return (
    <Page header={<Title />}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            width: "90%",
            maxWidth: "700px",
            justifyContent: "space-between",
            backgroundColor: "#eeeeee",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
            borderRadius: "20px",
            margin: "15px",
          }}
        >
          <Grid
            sx={{
              width: { xs: "150px", md: "200px", xl: "250px" },
              height: { xs: "150px", md: "200px", xl: "250px" },
              margin: "25px",
            }}
          >
            <Avatar
              alt="user"
              // src="/static/images/avatar/1.jpg"
              sx={{ width: "100%", height: "100%" }}
            />
          </Grid>
          <Grid
            sx={{
              flex: "1 auto",
              margin: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="userName"
              sx={{
                color: "#333",
                padding: "10px",
                fontFamily: "'Jua', sans-serif",
              }}
            >
              {auth[1]}
            </Typography>
            <Typography
              id="transition-modal-description"
              variant="body1"
              sx={{
                color: "#555",
                textAlign: "center",
              }}
            >
              무친사람
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            width: "90%",
            maxWidth: "700px",
            justifyContent: "space-between",
            backgroundColor: "#eeeeee",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
            borderRadius: "20px",
            margin: "15px",
          }}
        >
          <Grid
            sx={{
              flex: "1 auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="userName"
              sx={{
                color: "#333",
                padding: "10px 10px 0px 10px",
                fontFamily: "'Jua', sans-serif",
              }}
            >
              안녕
            </Typography>
            <Typography
              id="transition-modal-description"
              variant="body1"
              sx={{
                padding: "0px 10px 10px 10px",
                color: "#555",
              }}
            >
              오랜만이야
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            width: "90%",
            maxWidth: "700px",
            justifyContent: "space-between",
            backgroundColor: "#eeeeee",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
            borderRadius: "20px",
            margin: "15px",
          }}
        >
          <Grid
            sx={{
              flex: "1 auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="userName"
              sx={{
                color: "#333",
                padding: "10px 10px 0px 10px",
                fontFamily: "'Jua', sans-serif",
              }}
            >
              안녕
            </Typography>
            <Typography
              id="transition-modal-description"
              variant="body1"
              sx={{
                padding: "0px 10px 10px 10px",
                color: "#555",
              }}
            >
              오랜만이야
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

export default Profile;
