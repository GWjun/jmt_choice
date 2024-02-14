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
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import FaceIcon from "@mui/icons-material/Face";
import LogoutIcon from "@mui/icons-material/Logout";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { googleLogout } from "../utils/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { theme } from "../utils/Theme";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

import "../utils/font.css";
import SearchList from "./SearchList";

export default function Title() {
  const { auth } = useAuth();
  const { address } = useAppContext();

  const [menuToggle, setMenuToggle] = React.useState<boolean>(false);
  const [optionOpen, setOptionOpen] = React.useState<boolean>(false);
  const [keyword, setKeyword] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);

  React.useEffect(() => {
    // <SearchList searchKeyword={keyword} />;
  }, [keyword]);

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
      <MenuItem onClick={() => navigate("/profile")}>
        <FaceIcon fontSize="small" /> {auth[1]}
      </MenuItem>
      <MenuItem onClick={googleLogout}>
        <LogoutIcon fontSize="small" /> 로그아웃
      </MenuItem>
    </Menu>
  );

  const top100Films = ["맛사랑", "찌개사랑"];

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
            onClick={() => {
              navigate("/");
              setMenuToggle(false);
            }}
            sx={{
              mr: 2,
              cursor: "pointer",
              display: "flex",
              fontFamily: "'Jua', sans-serif",
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
            {menuToggle ? (
              <Autocomplete
                sx={{
                  width: { xs: "180px", md: "250px", xl: "300px" },
                  height: "37px",
                  "& .MuiInputBase-input": {
                    color: "black",
                    fontFamily: "'Jua', sans-serif",
                  },
                  "& .MuiInputBase-root": {
                    backgroundColor: "white",
                    borderRadius: "20px",
                  },
                }}
                id="size-small-standard"
                size="small"
                options={top100Films}
                getOptionLabel={(option) => String(option)}
                open={optionOpen}
                onInputChange={(event, value, reason) => {
                  setKeyword(value);
                  setOptionOpen(reason === "input");
                  if (reason === "reset") console.log(keyword);
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    console.log(keyword);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="검색"
                    autoFocus
                    onFocus={() => setOptionOpen(true)}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <span
                      style={{
                        color: "black",
                        fontFamily: "'Jua', sans-serif",
                      }}
                    >
                      {option}
                    </span>
                  </li>
                )}
              />
            ) : (
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
            )}
          </Box>
          <Box>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => setMenuToggle((prev) => !prev)}
            >
              <Badge color="secondary">
                <SearchIcon />
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
