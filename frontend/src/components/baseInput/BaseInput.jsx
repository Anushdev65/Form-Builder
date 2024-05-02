import React from "react";
import { Box } from "@mui/material";
import Textarea from "@mui/joy/Textarea";

const BaseInput = ({ ...props }) => {
  return (
    <Box margin={0.5}>
      <Textarea
        fullWidth
        size="lg"
        variant="outlined"
        minRows="7"
        {...{ ...props }}
      />
    </Box>
  );
};

export default BaseInput;
