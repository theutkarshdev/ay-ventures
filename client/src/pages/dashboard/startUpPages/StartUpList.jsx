import React from "react";
import Table from "./../../../components/tables/MyTable";
import PageNav from "../../../components/header/PageNav";

const tableColumns = [
  { id: "serial_no", label: "Sr No.", align: "center" },
  { id: "companyName", label: "Company Name", minWidth: 170 },
  { id: "email", label: "Company Email", minWidth: 170 },
  { id: "founder", label: "Founder", minWidth: 100 },
  { id: "revenue", label: "Revenue", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

const permissions = {
  edit: true,
  view: true,
  delete: false,
};

const StartUpList = () => {
  return (
    <>
      <PageNav
        label={"StartUp List"}
        btnText={"Add StartUp"}
        btnIcon={"fluent:add-circle-20-regular"}
        btnLink="/startup/add"
      />
      <Table
        delApi={"startup/delete"}
        tableDataApi={"startup/get-all"}
        columns={tableColumns}
        tablePermissions={permissions}
      />
    </>
  );
};

export default StartUpList;
