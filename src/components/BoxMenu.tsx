// BoxMenu.tsx

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../utils/Theme";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Choice from "./Choice";

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
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleNav = () => {
    if (nav === "/choice") {
      setIsOpen(true);
    } else navigate(nav);
  };

  React.useEffect(() => {}, [isOpen]);

  return (
    <>
      <Grid
        onClick={handleNav}
        sx={{
          backgroundColor: "#eeeeee",
          borderRadius: "10px",
          width: width,
          height: {
            xs: height,
            md: height + 40,
            lg: height + 60,
            xl: height + 80,
          },
          padding: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          marginRight: "12px",
          marginLeft: "12px",
          marginTop: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h2 style={{ margin: 0, paddingBottom: 5 }}>{title}</h2>
        <p style={{ fontSize: "14px", margin: 0, color: "#555555" }}>
          {comment}
        </p>
        <IconButton
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            color: theme.palette.secondary.main,
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Grid>
      {isOpen ? <Choice setIsOpen={setIsOpen} /> : null}
    </>
  );
};

export default BoxMenu;
