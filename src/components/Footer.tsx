import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import RestoreIcon from "@mui/icons-material/Restore";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="최근목록" icon={<RestoreIcon />} />
        <BottomNavigationAction label="메인메뉴" icon={<HomeIcon />} />
        <BottomNavigationAction label="즐겨찾기" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Box>
  );
}
