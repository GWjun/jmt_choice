// Title.tsx

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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
import Fade from "@mui/material/Fade";

import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "../utils/supabaseClient";
import { theme } from "../utils/Theme";
import { useAuth } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";

import "../utils/font.css";

interface TitleProps {
  initValue?: string;
  initMenu?: boolean;
}

const Title: React.FC<TitleProps> = ({ initValue, initMenu = false }) => {
  const { auth } = useAuth();
  const { address, foodStores } = useAppContext();

  const [menuToggle, setMenuToggle] = React.useState<boolean>(initMenu);
  const [localToggle, setLocalToggle] = React.useState<boolean>(initMenu);
  const [keyword, setKeyword] = React.useState<string>("-");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);

  async function handleSubmit(value?: string) {
    const searchKeyword = value || keyword;
    const { data: prev, error } = await supabase
      .from("keyword")
      .select("count")
      .eq("keyword", searchKeyword);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      const newCount = prev.length ? prev[0].count : 0;
      await supabase
        .from("keyword")
        .upsert([{ keyword: searchKeyword, count: newCount + 1 }]);
    }
    if (searchKeyword !== "") window.location.href = `/search/${searchKeyword}`;
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = () => {
    setLocalToggle((prev) => !prev);
    setTimeout(() => {
      setMenuToggle((prev) => !prev);
    }, 150);
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
              <Fade in={localToggle} timeout={150}>
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
                  value={keyword === "-" ? initValue : keyword}
                  options={foodStores}
                  getOptionLabel={(option) => String(option)}
                  onInputChange={(event, value, reason) => {
                    setKeyword(value);
                    if (reason === "reset" && value !== initValue)
                      handleSubmit(value);
                  }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") handleSubmit();
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="검색" autoFocus />
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
                  noOptionsText="데이터가 없습니다"
                />
              </Fade>
            ) : (
              <Fade in={!localToggle} timeout={150}>
                <Button
                  color="inherit"
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: "15px",
                    "&:hover": {
                      backgroundColor: "#3887BE",
                    },
                  }}
                  variant="contained"
                  endIcon={<SendIcon color="info" />}
                  onClick={() => navigate("/address")}
                >
                  {address.simple.replace(/"/g, "")}
                </Button>
              </Fade>
            )}
          </Box>
          <Box>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleToggle}
            >
              <SearchIcon />
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
};

export default Title;
