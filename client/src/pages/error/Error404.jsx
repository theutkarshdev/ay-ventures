import React from "react";
import Image from "../../assets/illustration-02-52bb43b3.svg";
const Error404 = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <img className="w-full max-w-sm mx-auto" src={Image} />
        <h4 className="text-4xl font-bold text-sky-600 opacity-70 -mt-5">Oops!! Error 404, Page not found</h4>
      </div>
    </div>
  );
};

export default Error404;
