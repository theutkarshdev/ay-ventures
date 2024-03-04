import { Icon } from "@iconify/react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({ formik, className, placeholder, theme = "snow", name, label }) => {
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
    </div>
  );
};

export default QuillEditor;
