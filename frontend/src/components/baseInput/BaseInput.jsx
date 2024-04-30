import React from "react";
import { Box, TextField } from "@mui/material";

const BaseInput = ({ ...props }) => {
  return (
    <Box margin={0.5}>
      <TextField fullWidth size="small" variant="outlined" {...{ ...props }} />
    </Box>
  );
};

export default BaseInput;
