import * as React from "react";
import { useNavigate } from "react-router-dom";

import Page from "../../components/Page";
import Title from "../../components/Title";
import { theme } from "../../utils/Theme";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const Choice: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => navigate("/");

  return (
    <Page header={<Title />}>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            style: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
          }}
        >
          <Fade in={open}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "70%",
                height: "60%",
                bgcolor: "#fff",
                borderRadius: "20px",
                boxShadow: 24,
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
    </Page>
  );
};

export default Choice;
