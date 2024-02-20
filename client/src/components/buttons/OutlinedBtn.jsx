import React from "react";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";

const OutlinedBtn = ({ text, extra, icon, iconRight, ...restProps }) => {
  return (
    <Button
      variant="outlined"
      className={`bg-white flex ${
        iconRight && "flex-row-reverse"
      } gap-1 text-sm items-center justify-center border-2 hover:border-2 border-sky-600 hover:bg-sky-700 hover:text-white shadow-none capitalize text-sky-600 rounded-md py-1.5 px-3 ${extra}`}
      {...restProps}
    >
      {icon && <Icon className="text-xl" icon={icon} />}
      {text}
    </Button>
  );
};

export default OutlinedBtn;
