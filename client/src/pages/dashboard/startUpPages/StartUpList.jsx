import React, { useEffect, useState } from "react";
import Table from "./../../../components/tables/MyTable";
import PageNav from "../../../components/header/PageNav";

const tableColumns = [
  { id: "serial_no", label: "Sr No.", align: "center" },
  { id: "firm_name", label: "Firm Name", minWidth: 170 },
  { id: "firm_email", label: "Firm Email", minWidth: 170 },
  { id: "type", label: "Type", minWidth: 100 },
  { id: "revenue", label: "Revenue", minWidth: 100 },
  { id: "company_age", label: "Company Age", minWidth: 100, align: "center" },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

const StartUpList = () => {
  return (
    <>
      <PageNav
        label={"StartUp List"}
        btnText={"Add StartUp"}
        btnIcon={"fluent:add-circle-20-regular"}
        btnLink="/startup/add"
      />
      <Table delApi={"investor/delete"} tableDataApi={"investor/get-all"} columns={tableColumns} />
    </>
  );
};

export default StartUpList;
