import { TextField } from "@mui/material";
import { Icon } from "@iconify/react";
import React from "react";

const MyInput = ({ error, helperText, ...restProps }) => {
  return (
    <TextField
      size="small"
      fullWidth
      variant="outlined"
      error={Boolean(error)}
      helperText={
        helperText && (
          <span className="flex items-center">
            <Icon className="text-lg mb-0.5" icon="fluent:error-circle-16-regular" />
            {helperText}
          </span>
        )
      }
      {...restProps}
    />
  );
};

export default MyInput;
