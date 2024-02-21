import * as React from "react";

import { theme } from "../utils/Theme";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

interface Props {
  setIsOpen: React.Dispatch<boolean>;
}
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Choice: React.FC<Props> = ({ setIsOpen }) => {
  const [localOpen, setLocalOpen] = React.useState<boolean>(true);
  const handleClose = async () => {
    setLocalOpen(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={localOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          style: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
        }}
      >
        <Fade in={localOpen} timeout={300}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              height: "60%",
              bgcolor: "#ffffff",
              "&:focus": {
                outline: "none",
              },
              borderRadius: "20px",
              boxShadow: "0 0 24px rgba(0, 0, 0, 0.1)",
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "#333", marginBottom: 2 }}
            >
              알고리즘 선택
            </Typography>
            <Typography
              id="transition-modal-description"
              variant="body1"
              sx={{
                color: "#555",
                mb: 3,
                textAlign: "center",
              }}
            >
              content
            </Typography>
            <button
              onClick={handleClose}
              style={{
                backgroundColor: theme.palette.secondary.main,
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                border: "none",
                outline: "none",
              }}
            >
              취소
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Choice;
