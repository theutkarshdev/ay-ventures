import { Icon } from "@iconify/react";
import { Tooltip } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({ formik, className, placeholder, tooltip, theme = "snow", name, label }) => {
  return (
    <div className={`relative ${className}`}>
      <h3
        className={`absolute -top-2 left-3 text-xs bg-white px-1 ${
          formik.touched[name] && formik.errors[name] && "text-red-600"
        }`}
      >
        {label}
      </h3>
      <ReactQuill
        className={`[&>.ql-toolbar]:rounded-t [&>.ql-container]:rounded-b [&>.ql-container]:min-h-40 [&>.ql-container]:overflow-y-auto [&>.ql-container]:max-h-52 ${
          formik.touched[name] &&
          formik.errors[name] &&
          "[&>.ql-container]:border-red-600 [&>.ql-toolbar]:border-red-600"
        }`}
        placeholder={placeholder}
        theme={theme}
        name={name}
        value={formik.values[name]}
        onChange={(value) => formik.setFieldValue(name, value)}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <span className="text-xs flex items-center text-red-600 mt-1">
          <Icon className="text-lg" icon="fluent:error-circle-16-regular" />
          {formik.errors[name]}
        </span>
      ) : null}

      <div className="absolute right-3 top-3">
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
            componentsProps={{
              tooltip: {
                sx: {
                  width: "100%",
                  maxWidth: "600px",
                },
              },
            }}
          >
            <Icon icon="fluent:info-16-regular" className="text-lg cursor-pointer hover:bg-gray-100 rounded-full" />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default QuillEditor;
