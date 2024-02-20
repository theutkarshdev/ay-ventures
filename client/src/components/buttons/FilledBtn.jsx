import React from "react";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";

const FilledBtn = ({ text, extra, icon, iconRight, ...restProps }) => {
  return (
    <Button
      variant="contained"
      className={`bg-sky-600 flex ${
        iconRight && "flex-row-reverse"
      } gap-1 text-sm border-2 hover:border-2 border-sky-600 items-center justify-center hover:bg-sky-700 shadow-none capitalize text-white rounded-md py-2 px-3 ${extra}`}
      {...restProps}
    >
      {icon && <Icon className="text-xl" icon={icon} />}
      {text}
    </Button>
  );
};

export default FilledBtn;
