import React, { useState } from "react";
import { InputAdornment } from "@mui/material";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import MyInput from "./../../../components/form/MyInput";
import FilledBtn from "./../../../components/buttons/FilledBtn";
import MySelect from "./../../../components/form/MySelect";
import { investorValidationSchema } from "./../../../utils/validationSchema";
import PageNav from "./../../../components/header/PageNav";
import { Autocomplete } from "@mui/material";

const sectorFocusOptions = ["Tech", "Healthcare", "Finance", "Consumer Goods", "Real Estate"];
const roundInvestOptions = ["Seed", "Series A", "Series B", "Series C", "Late Stage"];
const startUpOptions = ["Startup A", "Startup B", "Startup C", "Startup D", "Startup E"];
const dealStructureOptions = ["Equity", "Convertible Note"];

const initialValues = {
  firm_name: "",
  firm_email: "",
  type: "",
  sector_focus: [],
  ticket_size: "",
  website: "",
  date_onboarded: "",
  rounds_invest_in: [],
  lead_investor_required: false,
  deal_structure: [],
  revenue: "",
  company_age: "",
  valuation_cap: "",
  who_selected: [],
  who_rejected: [],
  open_dealflow_count: "",
  closed_dealflow_count: "",
  total_dealflow_count: "",
  geography: {
    country: "",
    state: "",
    location: [],
  },
  preference: {
    sc_st_obc: false,
    women: false,
  },
  employees: [
    {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      linkedin: "",
      initial_email: [],
    },
  ],
};

const AddInvestor = () => {
  const [employees, setEmployees] = useState(initialValues.employees);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: investorValidationSchema,
    onSubmit: (values) => {
      // Submit logic
      console.log(values);
    },
  });

  const handleAddEmployee = () => {
    setEmployees([...employees, initialValues.employees[0]]);
  };

  return (
    <>
      <PageNav
        label={"Add Investor"}
        btnText={"Investor List"}
        btnIcon={"solar:users-group-rounded-outline"}
        btnLink="/investor"
      />

      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="mt-5 mx-5 bg-white rounded-lg p-5">
          <h2 className="font-semibold text-xl opacity-70">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {/* Investor Firm Name */}
            <MyInput
              name="firm_name"
              type="text"
              label="Investor Firm Name"
              placeholder="Ex: Example Ventures"
              value={formik.values.firm_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firm_name && formik.errors.firm_name}
              helperText={formik.touched.firm_name && formik.errors.firm_name ? formik.errors.firm_name : ""}
            />

            {/* Investor Firm Email */}
            <MyInput
              name="firm_email"
              type="email"
              label="Investor Firm Email"
              placeholder="Ex: example@gmail.com"
              value={formik.values.firm_email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firm_email && formik.errors.firm_email}
              helperText={formik.touched.firm_email && formik.errors.firm_email ? formik.errors.firm_email : ""}
            />

            {/* Type */}
            <MySelect
              name="type"
              label="Type"
              options={["Angel Investor", "Venture Capitalist", "Private Equity", "Corporate Venture Capital"]}
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.type && formik.errors.type}
              helperText={formik.touched.type && formik.errors.type ? formik.errors.type : ""}
            />

            {/* Replace array fields with Autocomplete */}
            <Autocomplete
              size="small"
              multiple
              id="sector_focus"
              options={sectorFocusOptions}
              value={formik.values.sector_focus}
              onChange={(event, newValue) => {
                formik.setFieldValue("sector_focus", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="sector_focus"
                  label="Sector Focus"
                  placeholder="Select sector focus"
                  error={formik.touched.sector_focus && Boolean(formik.errors.sector_focus)}
                  helperText={formik.touched.sector_focus && formik.errors.sector_focus}
                />
              )}
            />

            {/* Ticket Size */}
            <MyInput
              name="ticket_size"
              type="number"
              label="Ticket Size"
              placeholder="Enter ticket size"
              value={formik.values.ticket_size}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.ticket_size && formik.errors.ticket_size}
              helperText={formik.touched.ticket_size && formik.errors.ticket_size ? formik.errors.ticket_size : ""}
            />

            {/* Website */}
            <MyInput
              name="website"
              type="url"
              label="Website"
              placeholder="Enter website URL"
              value={formik.values.website}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.website && formik.errors.website}
              helperText={formik.touched.website && formik.errors.website ? formik.errors.website : ""}
            />

            {/* Date Onboarded */}
            <MyInput
              name="date_onboarded"
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Date Onboarded"
              value={formik.values.date_onboarded}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.date_onboarded && formik.errors.date_onboarded}
              helperText={
                formik.touched.date_onboarded && formik.errors.date_onboarded ? formik.errors.date_onboarded : ""
              }
            />

            <Autocomplete
              size="small"
              multiple
              id="rounds_invest_in"
              options={roundInvestOptions}
              value={formik.values.rounds_invest_in}
              onChange={(event, newValue) => {
                formik.setFieldValue("rounds_invest_in", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="rounds_invest_in"
                  label="Sector Focus"
                  placeholder="Select sector focus"
                  error={formik.touched.rounds_invest_in && Boolean(formik.errors.rounds_invest_in)}
                  helperText={formik.touched.rounds_invest_in && formik.errors.rounds_invest_in}
                />
              )}
            />

            {/* Checkbox for lead investor required */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="lead_investor_required"
                  checked={formik.values.lead_investor_required}
                  onChange={formik.handleChange}
                  className="mt-0.5"
                />
                Lead Investor Required
              </label>
            </div>

            <Autocomplete
              size="small"
              multiple
              id="deal_structure"
              options={dealStructureOptions}
              value={formik.values.deal_structure}
              onChange={(event, newValue) => {
                formik.setFieldValue("deal_structure", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="deal_structure"
                  label="Deal Structure"
                  placeholder="Select Deal Structure"
                  error={formik.touched.deal_structure && Boolean(formik.errors.deal_structure)}
                  helperText={formik.touched.deal_structure && formik.errors.deal_structure}
                />
              )}
            />

            {/* Revenue */}
            <MyInput
              name="revenue"
              type="number"
              label="Revenue"
              placeholder="Enter revenue"
              value={formik.values.revenue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.revenue && formik.errors.revenue}
              helperText={formik.touched.revenue && formik.errors.revenue ? formik.errors.revenue : ""}
            />

            {/* Company Age */}
            <MyInput
              name="company_age"
              type="number"
              label="Company Age"
              placeholder="Enter company age"
              value={formik.values.company_age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.company_age && formik.errors.company_age}
              helperText={formik.touched.company_age && formik.errors.company_age ? formik.errors.company_age : ""}
            />

            {/* Valuation Cap */}
            <MyInput
              name="valuation_cap"
              type="number"
              label="Valuation Cap"
              placeholder="Enter valuation cap"
              value={formik.values.valuation_cap}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.valuation_cap && formik.errors.valuation_cap}
              helperText={
                formik.touched.valuation_cap && formik.errors.valuation_cap ? formik.errors.valuation_cap : ""
              }
            />

            <Autocomplete
              size="small"
              multiple
              id="who_selected"
              options={startUpOptions}
              value={formik.values.who_selected}
              onChange={(event, newValue) => {
                formik.setFieldValue("who_selected", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="who_selected"
                  label="Who selected"
                  placeholder="Choose who selected"
                  error={formik.touched.who_selected && Boolean(formik.errors.who_selected)}
                  helperText={formik.touched.who_selected && formik.errors.who_selected}
                />
              )}
            />

            <Autocomplete
              size="small"
              multiple
              id="who_rejected"
              options={startUpOptions}
              value={formik.values.who_rejected}
              onChange={(event, newValue) => {
                formik.setFieldValue("who_rejected", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="who_rejected"
                  label="Who rejected"
                  placeholder="Choose who rejected"
                  error={formik.touched.who_rejected && Boolean(formik.errors.who_rejected)}
                  helperText={formik.touched.who_rejected && formik.errors.who_rejected}
                />
              )}
            />

            {/* Open Dealflow Count */}
            <MyInput
              name="open_dealflow_count"
              type="number"
              label="Open Dealflow Count"
              placeholder="Enter open dealflow count"
              value={formik.values.open_dealflow_count}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.open_dealflow_count && formik.errors.open_dealflow_count}
              helperText={
                formik.touched.open_dealflow_count && formik.errors.open_dealflow_count
                  ? formik.errors.open_dealflow_count
                  : ""
              }
            />

            {/* Closed Dealflow Count */}
            <MyInput
              name="closed_dealflow_count"
              type="number"
              label="Closed Dealflow Count"
              placeholder="Enter closed dealflow count"
              value={formik.values.closed_dealflow_count}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.closed_dealflow_count && formik.errors.closed_dealflow_count}
              helperText={
                formik.touched.closed_dealflow_count && formik.errors.closed_dealflow_count
                  ? formik.errors.closed_dealflow_count
                  : ""
              }
            />

            {/* Total Dealflow Count */}
            <MyInput
              name="total_dealflow_count"
              type="number"
              label="Total Dealflow Count"
              placeholder="Enter total dealflow count"
              value={formik.values.total_dealflow_count}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.total_dealflow_count && formik.errors.total_dealflow_count}
              helperText={
                formik.touched.total_dealflow_count && formik.errors.total_dealflow_count
                  ? formik.errors.total_dealflow_count
                  : ""
              }
            />
          </div>
        </div>
        <div className="mt-5 mx-5 bg-white rounded-lg p-5">
          <h2 className="font-semibold text-xl opacity-70">Registered Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            <MyInput
              name="geography.country"
              type="text"
              label="Country"
              placeholder="Country"
              value={formik.values.geography.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.geography &&
                formik.errors.geography &&
                formik.touched.geography.country &&
                formik.errors.geography.country
              }
              helperText={
                formik.touched.geography &&
                formik.errors.geography &&
                formik.touched.geography.country &&
                formik.errors.geography.country
                  ? formik.errors.geography.country
                  : ""
              }
            />
            <MyInput
              name="geography.state"
              type="text"
              label="State"
              placeholder="State"
              value={formik.values.geography.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.geography &&
                formik.errors.geography &&
                formik.touched.geography.state &&
                formik.errors.geography.state
              }
              helperText={
                formik.touched.geography &&
                formik.errors.geography &&
                formik.touched.geography.state &&
                formik.errors.geography.state
                  ? formik.errors.geography.state
                  : ""
              }
            />
            <Autocomplete
              size="small"
              multiple
              id="geography_location"
              options={["Rewari", "Gurgaon", "Faridabad", "Hisar", "Panipat"]}
              value={formik.values.geography.location}
              onChange={(event, newValue) => {
                formik.setFieldValue("geography.location", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="geography_location"
                  label="Location"
                  placeholder="Select location"
                  error={
                    formik.touched.geography &&
                    formik.errors.geography &&
                    formik.touched.geography.location &&
                    formik.errors.geography.location
                  }
                  helperText={
                    formik.touched.geography &&
                    formik.errors.geography &&
                    formik.touched.geography.location &&
                    formik.errors.geography.location
                      ? formik.errors.geography.location
                      : ""
                  }
                />
              )}
            />
          </div>
        </div>

        <div className="mt-5 mx-5 bg-white rounded-lg p-5">
          <h2 className="font-semibold text-xl opacity-70">Preference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {/* Checkboxes for preference */}
            <div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="preference.sc_st_obc" // Corrected name attribute
                  checked={formik.values.preference.sc_st_obc}
                  onChange={formik.handleChange}
                  className="mt-0.5"
                />
                SC/ST/OBC
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="preference.women" // Corrected name attribute
                  checked={formik.values.preference.women}
                  onChange={formik.handleChange}
                  className="mt-0.5"
                />
                Women
              </label>
            </div>
          </div>
        </div>

        <div className="mt-5 mx-5 bg-white rounded-lg p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xl opacity-70">All Employees</h2>
            <FilledBtn type="button" text="Add Employee" onClick={handleAddEmployee} />
          </div>

          {employees.map((employee, index) => (
            <div key={index} className="mt-5 border rounded-lg p-4">
              <h2>Employee {index + 1}</h2>
              {/* First Name */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                <MyInput
                  name={`employees[${index}].first_name`}
                  type="text"
                  label="First Name"
                  placeholder="Enter first name"
                  value={employee.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.employees &&
                    formik.errors.employees &&
                    formik.errors.employees[index] &&
                    formik.errors.employees[index].first_name
                  }
                  helperText={
                    formik.touched.employees &&
                    formik.errors.employees &&
                    formik.errors.employees[index] &&
                    formik.errors.employees[index].first_name
                      ? formik.errors.employees[index].first_name
                      : ""
                  }
                />
                {/* Last Name */}
                <MyInput
                  name={`employees[${index}].last_name`}
                  type="text"
                  label="Last Name"
                  placeholder="Enter last name"
                  value={employee.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.employees &&
                    formik.errors.employees &&
                    formik.errors.employees[index] &&
                    formik.errors.employees[index].last_name
                  }
                  helperText={
                    formik.touched.employees &&
                    formik.errors.employees &&
                    formik.errors.employees[index] &&
                    formik.errors.employees[index].last_name
                      ? formik.errors.employees[index].last_name
                      : ""
                  }
                />
                {/* Phone Number */}
                <MyInput
                  name={`employees[${index}].phone_number`}
                  type="text"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  value={employee.phone_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.employees &&
                    formik.errors.employees &&
                    formik.errors.employees[index] &&
                    formik.errors.employees[index].phone_number
                  }
                  helperText={
                    formik.touched.employees &&
                    formik.errors.employees &&
                    formik.errors.employees[index] &&
                    formik.errors.employees[index].phone_number
                      ? formik.errors.employees[index].phone_number
                      : ""
                  }
                />
                {/* Email */}
                <MyInput
                  name={`employees[${index}].email`}
                  type="text"
                  label="Email"
                  placeholder="Enter email"
                  value={employee.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.employees &&
                    formik.errors.employees &&
                    formik.errors.employees[index] &&
                    formik.errors.employees[index].email
                  }
                  helperText={
                    formik.touched.employees &&
                    formik.errors.employees &&
                    formik.errors.employees[index] &&
                    formik.errors.employees[index].email
                      ? formik.errors.employees[index].email
                      : ""
                  }
                />
                {/* LinkedIn */}
                <MyInput
                  name={`employees[${index}].linkedin`}
                  type="text"
                  label="LinkedIn"
                  placeholder="Enter LinkedIn profile URL"
                  value={employee.linkedin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.employees &&
                    formik.errors.employees &&
                    formik.errors.employees[index] &&
                    formik.errors.employees[index].linkedin
                  }
                  helperText={
                    formik.touched.employees &&
                    formik.errors.employees &&
                    formik.errors.employees[index] &&
                    formik.errors.employees[index].linkedin
                      ? formik.errors.employees[index].linkedin
                      : ""
                  }
                />
                {/* Add more fields for other employee details as needed */}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-5 float-right">
          <FilledBtn
            type="submit"
            extra="my-10"
            iconRight={true}
            icon="solar:arrow-right-linear"
            text="Save Investor"
          />
        </div>
      </form>
    </>
  );
};

export default AddInvestor;
