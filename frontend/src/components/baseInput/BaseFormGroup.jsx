import React from "react";
import { Grid } from "@mui/material";

const BaseFormGroup = ({
  label = "",
  required = false,
  children,
  vertical = false,
}) => {
  return (
    <Grid container spacing={vertical ? 0.5 : 3}>
      <Grid item xs={vertical ? 12 : 3}>
        {!!label && (
          <label htmlFor={label} className="form-label">
            {label}
            {required && <span>*</span>}:
          </label>
        )}
      </Grid>

      <Grid item xs={vertical ? 12 : 9}>
        <div id={label}>{children}</div>
      </Grid>
    </Grid>
  );
};

export default BaseFormGroup;
