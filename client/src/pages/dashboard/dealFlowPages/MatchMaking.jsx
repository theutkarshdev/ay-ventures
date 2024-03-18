import React from "react";
import PageNav from "./../../../components/header/PageNav";
import MyTable from "../../../components/tables/MyTable";

const tableColumns = [
  { id: "createdAt", label: "Company Email", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

const MatchMaking = () => {
  return (
    <>
      <PageNav label={"Match Making"} btnText={"Dashboard"} btnIcon={"radix-icons:dashboard"} btnLink="/" />
      <MyTable tableDataApi={"match/get-all"} columns={tableColumns} />
    </>
  );
};

export default MatchMaking;
