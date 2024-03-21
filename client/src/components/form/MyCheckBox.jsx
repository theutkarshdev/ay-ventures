import { Tooltip } from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";

const MyCheckbox = ({ label, name, tooltip, checked, onChange }) => {
  return (
    <div className="border rounded py-2 px-3 border-gray-400">
      <label className="flex items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-2">
          <input type="checkbox" name={name} checked={checked} onChange={onChange} className="mt-0.5" />
          {label}
        </div>
        {tooltip && (
          <Tooltip
            placement="top"
            title={
              <div
                className="bg-white border rounded text-black text-sm my-1 p-3"
                dangerouslySetInnerHTML={{ __html: tooltip }}
              ></div>
            }
            arrow
          >
            <Icon
              icon="fluent:info-16-regular"
              className="text-lg cursor-pointer hover:bg-gray-100 rounded-full"
            />
          </Tooltip>
        )}
      </label>
    </div>
  );
};

export default MyCheckbox;
