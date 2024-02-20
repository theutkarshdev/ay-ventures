import React from "react";
import Table from "./../../../components/tables/MyTable";
import PageNav from "../../../components/header/PageNav";

const investorData = [
  {
    serial_no: 1,
    firm_name: "ABC Ventures",
    firm_email: "info@abcventures.com",
    type: "Angel Investor",
    sector_focus: ["Technology", "Healthcare"],
    revenue: "$5 million",
    company_age: "3 years",
  },
  {
    serial_no: 2,
    firm_name: "XYZ Capital",
    firm_email: "contact@xyzcapital.com",
    type: "Venture Capital",
    sector_focus: ["Financial Services", "Retail"],
    revenue: "$10 million",
    company_age: "5 years",
  },
  {
    serial_no: 3,
    firm_name: "TechFund Inc.",
    firm_email: "info@techfund.com",
    type: "Private Equity",
    sector_focus: ["Technology", "Software"],
    revenue: "$20 million",
    company_age: "7 years",
  },
  {
    serial_no: 4,
    firm_name: "HealthCare Growth Partners",
    firm_email: "contact@hcgp.com",
    type: "Private Equity",
    sector_focus: ["Healthcare", "Biotechnology"],
    revenue: "$15 million",
    company_age: "4 years",
  },
  {
    serial_no: 5,
    firm_name: "GreenTech Ventures",
    firm_email: "info@greentechvc.com",
    type: "Venture Capital",
    sector_focus: ["Renewable Energy", "Sustainability"],
    revenue: "$8 million",
    company_age: "2 years",
  },
  {
    serial_no: 6,
    firm_name: "SilverStone Investments",
    firm_email: "contact@silverstoneinv.com",
    type: "Hedge Fund",
    sector_focus: ["Real Estate", "Technology"],
    revenue: "$25 million",
    company_age: "6 years",
  },
  {
    serial_no: 7,
    firm_name: "Capital Innovators",
    firm_email: "info@capitalinnovators.co",
    type: "Accelerator",
    sector_focus: ["Startups", "Tech"],
    revenue: "$3 million",
    company_age: "1 year",
  },
  {
    serial_no: 8,
    firm_name: "Global Finance Group",
    firm_email: "contact@globalfinance.com",
    type: "Investment Bank",
    sector_focus: ["Finance", "Insurance"],
    revenue: "$30 million",
    company_age: "8 years",
  },
  {
    serial_no: 9,
    firm_name: "BrightFuture Ventures",
    firm_email: "info@brightfuturevc.com",
    type: "Venture Capital",
    sector_focus: ["Clean Energy", "Healthcare"],
    revenue: "$12 million",
    company_age: "3 years",
  },
  {
    serial_no: 10,
    firm_name: "Alpha Partners",
    firm_email: "contact@alphapartners.com",
    type: "Private Equity",
    sector_focus: ["Technology", "Consumer Goods"],
    revenue: "$18 million",
    company_age: "5 years",
  },
];

const tableColumns = [
  { id: "serial_no", label: "Sr No.", align: "center" },
  { id: "firm_name", label: "Firm Name", minWidth: 170 },
  { id: "firm_email", label: "Firm Email", minWidth: 170 },
  { id: "type", label: "Type", minWidth: 100 },
  { id: "sector_focus", label: "Sector Focus", minWidth: 170 },
  { id: "revenue", label: "Revenue", minWidth: 100 },
  { id: "company_age", label: "Company Age", minWidth: 100, align: "center" },
  { id: "actions", label: "Actions", minWidth: 100 },
];

const InvestorList = () => {
  return (
    <>
      <PageNav
        label={"Investor List"}
        btnText={"Add Investor"}
        btnIcon={"fluent:add-circle-20-regular"}
        btnLink="/investor/add"
      />

      <Table data={investorData} columns={tableColumns} />
    </>
  );
};

export default InvestorList;
