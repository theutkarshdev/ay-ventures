import { MenuItem, TextField } from "@mui/material";
import { Icon } from "@iconify/react";
import React from "react";

const MySelect = ({ error, helperText, options, ...restProps }) => {
  const isValidOptions = Array.isArray(options);
  return (
    <TextField
      size="small"
      fullWidth
      select
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
    >
      <MenuItem disabled value="">
        <em>Kindly choose an option</em>
      </MenuItem>
      {isValidOptions && options.length > 0 ? (
        options.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>
          <em>Invalid options provided</em>
        </MenuItem>
      )}
    </TextField>
  );
};

export default MySelect;
