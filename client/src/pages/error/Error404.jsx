import React from "react";
import Image from "../../assets/error2-400.png";
const Error404 = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <img className="w-full max-w-screen-md mx-auto" src={Image} />
        <h4 className="text-4xl font-bold text-sky-600 opacity-70 text-center">Oops!! Error 404, Page not found</h4>
      </div>
    </div>
  );
};

export default Error404;
