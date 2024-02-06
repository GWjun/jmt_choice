// BoxMenu.tsx

import * as React from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

interface BoxMenuProps {
  nav: string;
  width: string;
  height: number;
  title: string;
  comment: string;
}

const BoxMenu: React.FC<BoxMenuProps> = ({
  nav,
  width,
  height,
  title,
  comment,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Grid
        onClick={() => navigate(nav)}
        sx={{
          backgroundColor: "#eeeeee",
          borderRadius: "14px",
          width: width,
          height: {
            xs: height,
            md: height + 40,
            lg: height + 80,
            xl: height + 120,
          },
          padding: "20px",
          marginRight: "12px",
          marginLeft: "12px",
          marginTop: "20px",
        }}
      >
        <h2 style={{ margin: "0 auto", paddingBottom: 3 }}>{title}</h2>
        <p style={{ fontSize: "13px", margin: 1 }}>{comment}</p>
        {/* <img
          src="/images/map.jpg"
          alt="Menu Image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        /> */}
      </Grid>
    </>
  );
};

export default BoxMenu;
