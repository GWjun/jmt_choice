// Title.tsx

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import FaceIcon from "@mui/icons-material/Face";
import LogoutIcon from "@mui/icons-material/Logout";

import { googleLogout } from "../utils/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { theme } from "../utils/Theme";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Title() {
  const { auth } = useAuth();
  const { address } = useAppContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const width = auth[1].length > 4 ? "200px" : "120px";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 40,
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        "& .MuiPaper-root": {
          width: width,
          backgroundColor: "#f8f9fa",
          color: "#212529",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
        "& .MuiMenuItem-root": {
          fontSize: "14px",
          padding: "12px",
          justifyContent: "space-between",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#dee2e6",
          },
        },
      }}
    >
      <MenuItem onClick={handleMenuClose}>
        <FaceIcon fontSize="small" /> {auth[1]}
      </MenuItem>
      <MenuItem onClick={googleLogout}>
        <LogoutIcon fontSize="small" /> 로그아웃
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            minHeight: "32px !important",
            color: theme.palette.text.primary,
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              cursor: "pointer",
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JMT
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "23px",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Button
              sx={{
                color: "inherit",
                backgroundColor: theme.palette.secondary.main,
                borderRadius: "15px",
              }}
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => navigate("/address")}
            >
              {address.simple.replace(/"/g, "")}
            </Button>
          </Box>
          <Box>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge color="secondary" variant="dot" invisible={false}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
