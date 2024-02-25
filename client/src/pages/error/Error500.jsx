import React from "react";
import Image from "../../assets/error2-500.png";

const Error500 = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <img className="w-full max-w-screen-md mx-auto" src={Image} />
        <h4 className="text-center text-4xl font-bold text-sky-600 opacity-70">Oops!! Error 500, Server Error.</h4>
      </div>
    </div>
  );
};

export default Error500;
