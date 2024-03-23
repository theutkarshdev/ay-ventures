import { Backdrop, InputAdornment, Popover, TextField, Tooltip } from "@mui/material";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

const MyInput = ({ error, helperText, popover, ...restProps }) => {
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
      InputProps={{
        endAdornment: popover && (
          <InputAdornment position="end">
            <Tooltip
              placement="top"
              title={
                <div
                  className="bg-white rounded text-black text-sm my-1 p-3"
                  dangerouslySetInnerHTML={{ __html: popover }}
                ></div>
              }
              arrow
            >
              <Icon
                icon="fluent:info-16-regular"
                className="text-lg cursor-pointer hover:bg-gray-100 rounded-full"
              />
            </Tooltip>
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
};

export default MyInput;
