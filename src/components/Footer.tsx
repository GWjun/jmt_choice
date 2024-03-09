// Footer.tsx

import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

const Footer = ({ value }: { value?: number }) => {
  const [selectedItem, setSelectedItem] = React.useState<number>(1);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (value !== undefined) setSelectedItem(value);
  }, [value]);

  return (
    <Box>
      <BottomNavigation showLabels value={selectedItem}>
        <BottomNavigationAction
          label="최근목록"
          icon={<RestoreIcon />}
          onClick={() => navigate("/recent")}
        />
        <BottomNavigationAction
          label="메인메뉴"
          icon={<HomeOutlinedIcon />}
          onClick={() => navigate("/")}
        />
        <BottomNavigationAction
          label="즐겨찾기"
          icon={<StarBorderOutlinedIcon />}
          onClick={() => navigate("/favorite")}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
