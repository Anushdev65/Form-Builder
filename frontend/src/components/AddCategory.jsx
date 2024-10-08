import { TextField } from "@mui/material";
import React from "react";
import MUIError from "../components/materialComponents/MUIError";

const AddCategory = ({ handleBlur, touched, errors, handleChange, values }) => {
  return (
    <React.Fragment>
      <TextField
        error={Boolean(touched.name && errors.name)}
        autoComplete="off"
        name="name"
        required
        fullWidth
        id="name"
        label="Category"
        variant="standard"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
      />
      <MUIError touch={touched.name} error={errors.name} value={false} />
    </React.Fragment>
  );
};

export default AddCategory;
