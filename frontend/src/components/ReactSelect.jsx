import React from "react";
import { FormHelperText } from "@mui/material";
import Select from "react-select";

const ReactSelect = ({ helperText = "", error = false, ...selectProps }) => {
  return (
    <>
      <Select
        className="form-font"
        {...selectProps}
        styles={{
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
      />

      <FormHelperText {...{ error }} style={{ marginLeft: 12 }}>
        {helperText}
      </FormHelperText>
    </>
  );
};

export default ReactSelect;
