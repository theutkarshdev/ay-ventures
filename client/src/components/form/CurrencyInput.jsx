import { InputAdornment, TextField, Tooltip } from "@mui/material";
import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import numberToWords from "number-to-words";

const CurrencyInput = ({ formik, placeholder, name, label, ...restProps }) => {
  const [amountInWords, setAmountInWords] = useState("");

  useEffect(() => {
    // When the value from formik changes, update the amountInWords
    if (!isNaN(formik.values[name]) && isFinite(formik.values[name]) && formik.values[name]) {
      setAmountInWords(numberToWords.toWords(formik.values[name]));
    } else {
      setAmountInWords("");
    }
  }, [formik.values[name]]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue) && isFinite(inputValue) && inputValue) {
      setAmountInWords(numberToWords.toWords(inputValue));
    } else {
      setAmountInWords("");
    }

    if (restProps.onChange) {
      restProps.onChange(event);
    }
  };

  return (
    <TextField
      size="small"
      type="number"
      fullWidth
      label={label}
      variant="outlined"
      error={Boolean(formik.touched[name] && formik.errors[name])}
      placeholder={placeholder}
      name={name}
      value={formik.values[name]}
      onChange={(event) => {
        formik.setFieldValue(name, event.target.value);
        handleInputChange(event);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip placement="top" title={amountInWords && <span className="capitalize">{amountInWords}</span>} arrow>
              <Icon
                icon="fluent:error-circle-16-regular"
                className="text-lg cursor-pointer hover:bg-gray-100 rounded-full"
              />
            </Tooltip>
          </InputAdornment>
        ),

        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      helperText={
        formik.touched[name] && formik.errors[name] ? (
          <span className="text-xs flex items-center text-red-600 mt-1">
            <Icon icon="fluent:error-circle-16-regular" className="text-lg" />
            {formik.errors[name]}
          </span>
        ) : null
      }
    />
  );
};

export default CurrencyInput;
