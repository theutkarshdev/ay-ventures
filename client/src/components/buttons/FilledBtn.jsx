import React from "react";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";

const FilledBtn = ({ text, extra, bg, icon, iconRight, ...restProps }) => {
  return (
    <Button
      variant="contained"
      className={`${
        bg ? `bg-${bg}-500 border-${bg}-600 hover:bg-${bg}-700` : "bg-sky-600 border-sky-600 hover:bg-sky-700"
      } flex ${
        iconRight ? "flex-row-reverse" : "" // Corrected this line
      } gap-1 text-sm border-2 hover:border-2 items-center justify-center shadow-none capitalize text-white rounded-md py-2 px-3 ${extra}`}
      {...restProps}
    >
      {icon && <Icon className="text-xl" icon={icon} />}
      {text}
    </Button>
  );
};

export default FilledBtn;
