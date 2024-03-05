import { TextField, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

const Form = ({ clickButton }) => {
  const [form, setForm] = useState({ x: 0, y: 0, sum: 0 });
  const [error, setError] = useState("");

  const onClick = () => {
    if (form.x <= 0 || form.y <= 0 || form.sum <= 0) {
      setError("All fields must be greater than 0");
    } else {
      clickButton(form);
    }
  };
  const handaleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "30%",
        alignItems: "center",
        height: "50%",
        justifyContent: "space-evenly",
      }}
    >
      <TextField
        onChange={(e) => handaleChange(e)}
        type="number"
        variant="outlined"
        label="x"
        name="x"
      />
      <TextField
        onChange={(e) => handaleChange(e)}
        type="number"
        variant="outlined"
        label="y"
        name="y"
      />
      <TextField
        onChange={(e) => handaleChange(e)}
        type="number"
        variant="outlined"
        label="sum"
        name="sum"
      />
      <Typography sx={{ fontSize: "1rem", color: "red" }}>{error}</Typography>
      <Button onClick={onClick} variant="contained">
        send
      </Button>
    </Box>
  );
};

export default Form;
