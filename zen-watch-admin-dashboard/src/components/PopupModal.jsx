import React, { useState } from "react";
import { Modal, Button, Typography, Box } from "@mui/material";

const PopupModal = ({ open, onClose, status }) => {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  if (status === "success") {
    setTitle("Success!");
    setMessage("IFTTT instance created successfully.");
  } else if (status === "error") {
    setTitle("Error!");
    setMessage("An error occurred while creating the IFTTT instance.");
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          boxShadow: 24,
          p: 4,
          outline: "none",
          minWidth: 400,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {message}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PopupModal;
