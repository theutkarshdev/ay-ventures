import React from "react";
import PageNav from "./../../../components/header/PageNav";
import MyTable from "../../../components/tables/MyTable";

const tableColumns = [
  { id: "serial_no", label: "Sr No.", align: "center" },
  { id: "firmName", label: "Investor Name", minWidth: 170 },
  { id: "firmEmail", label: "Investor Email", minWidth: 170 },
  { id: "companyName", label: "Company Name", minWidth: 170 },
  { id: "companyEmail", label: "Company Email", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

const permissions = {
  edit: false,
  view: true,
  delete: false,
};

const MatchMaking = () => {
  return (
    <>
      <PageNav label={"Match Making"} btnText={"Dashboard"} btnIcon={"radix-icons:dashboard"} btnLink="/" />
      <MyTable tableDataApi={"match/get-all"} columns={tableColumns} tablePermissions={permissions} />
    </>
  );
};

export default MatchMaking;
