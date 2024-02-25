import { Icon } from "@iconify/react";
import React from "react";
import FilledBtn from "../buttons/FilledBtn";
import { Link, useNavigate } from "react-router-dom";

const PageNav = ({ label, btnText, btnIcon, btnLink }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mt-5 mx-3 md:mx-5 ">
      <div className="flex items-center gap-2">
        <Icon onClick={() => navigate(-1)} className="text-2xl mt-0.5 cursor-pointer" icon="tabler:arrow-left" />
        <h2 className="text-xl font-semibold">{label}</h2>
      </div>
      {btnText && (
        <Link to={btnLink}>
          <FilledBtn icon={btnIcon} text={btnText} />
        </Link>
      )}
    </div>
  );
};

export default PageNav;
