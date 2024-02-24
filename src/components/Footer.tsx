// Footer.tsx

import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import HomeIcon from "@mui/icons-material/Home";
import RestoreIcon from "@mui/icons-material/Restore";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

interface Props {
  value: number;
  onChange: (newValue: number) => void;
}

const Footer: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
      >
        <BottomNavigationAction label="최근목록" icon={<RestoreIcon />} />
        <BottomNavigationAction label="메인메뉴" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="즐겨찾기"
          icon={<StarBorderOutlinedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
