import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { flexbox } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: flexbox,

  //   justifyContent : center,
  p: 4,
};

export default function CommentsModal({ comments }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log("comments", comments);

  return (
    <div>
      <Button
        style={{
          marginTop: "20px",
          marginLeft: "60px",
          border: "none",
          background: "none",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        View All Comments ⏑
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{ overflowY: "scroll" }} sx={style}>
          {comments.map((data) => (
            <>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <p>
                  {" "}
                  <span style={{ fontWeight: "600" }}>
                    {" "}
                    {data.senderName} :
                  </span>{" "}
                  {data.text}
                </p>{" "}
              </Typography>
            </>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
