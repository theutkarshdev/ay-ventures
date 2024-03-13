import React, { useState } from "react";
import { useFormik } from "formik";
import MyInput from "./../../../components/form/MyInput";
import FilledBtn from "./../../../components/buttons/FilledBtn";
import MySelect from "./../../../components/form/MySelect";
import { investorValidationSchema } from "./../../../utils/validationSchema";
import PageNav from "./../../../components/header/PageNav";
import { Autocomplete } from "@mui/material";
import {
  indianStates,
  investorTypes,
  sectorFocusOptions,
  roundInvestOptions,
  dealStructureOptions,
  countries,
} from "../../../utils/options";
import axios from "axios";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import CurrencyInput from "../../../components/form/CurrencyInput";

const initialValues = {
  firm_name: "",
  firm_email: "",
  type: "",
  location: {
    country: "",
    state: "",
  },
  sector_focus: [],
  min_ticket_size: 0,
  max_ticket_size: 0,
  website: "",
  date_onboarded: "",
  rounds_invest_in: [],
  lead_investor_required: false,
  deal_structure: [],
  startup_min_revenue: 0,
  startup_min_company_age: 0,
  startup_max_valuation_cap: 0,
  startup_location_preference: {
    country: [],
    state: [],
    global: false,
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
    },
  ],
};

const AddInvestor = () => {
  const [employees, setEmployees] = useState(initialValues.employees);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: investorValidationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, { resetForm });
    },
  });

  const handleSubmit = async (values, { resetForm }) => {
    const loadingToastId = toast.loading("Please wait...");
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/api/investor/multi-add`, [values]);
      if (response.status === 201) {
        toast.success("Investor Added Successfully...", { id: loadingToastId });
        setEmployees(initialValues.employees);
        resetForm();
      } else {
        toast.error("Facing some error !!", { id: loadingToastId });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went really wrong...", { id: loadingToastId });
    }
  };

  const handleAddEmployee = () => {
    // Create a new employee object
    const newEmployee = { first_name: "", last_name: "", phone_number: "", email: "", linkedin: "" };

    // Update the formik values for employees
    formik.setValues((prevValues) => ({
      ...prevValues,
      employees: [...prevValues.employees, newEmployee],
    }));

    // Update the local state
    setEmployees([...employees, newEmployee]);
  };

  const handleRemoveEmployee = (index) => {
    // Remove employee from Formik values
    formik.setValues((prevValues) => ({
      ...prevValues,
      employees: prevValues.employees.filter((_, i) => i !== index),
    }));

    // Remove employee from local state
    setEmployees((prevEmployees) => prevEmployees.filter((_, i) => i !== index));
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

            <MySelect
              name="location.country"
              label="Current Country"
              options={countries} // Define your country options
              value={formik.values.location.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location?.country && formik.errors.location?.country}
              helperText={
                formik.touched.location?.country && formik.errors.location?.country
                  ? formik.errors.location?.country
                  : ""
              }
            />

            <MySelect
              name="location.state"
              label="Current State"
              options={indianStates} // Define your state options
              value={formik.values.location.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location?.state && formik.errors.location?.state}
              helperText={
                formik.touched.location?.state && formik.errors.location?.state ? formik.errors.location?.state : ""
              }
            />

            {/* Ticket Size */}
            <CurrencyInput
              name="min_ticket_size"
              label="Minimum Ticket Size in USD($)"
              placeholder="min ticket size in USD($)"
              formik={formik}
            />

            <CurrencyInput
              name="max_ticket_size"
              label="Maximum Ticket Size in USD($)"
              placeholder="max ticket size in USD($)"
              formik={formik}
            />

            {/* Website */}
            <MyInput
              name="website"
              type="url"
              label="Website"
              placeholder="Eg: https://example.com"
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
          </div>
        </div>

        <div className="mt-5 mx-5 bg-white rounded-lg p-5">
          <h2 className="font-semibold text-xl opacity-70">Thesis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 items-center">
            <Autocomplete
              size="small"
              multiple
              id="sector_focus"
              options={sectorFocusOptions} // Define your options
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

            <Autocomplete
              size="small"
              multiple
              id="rounds_invest_in"
              options={roundInvestOptions} // Define your options
              value={formik.values.rounds_invest_in}
              onChange={(event, newValue) => {
                formik.setFieldValue("rounds_invest_in", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="rounds_invest_in"
                  label="Rounds invest in"
                  placeholder="Select Rounds invest in"
                  error={formik.touched.rounds_invest_in && Boolean(formik.errors.rounds_invest_in)}
                  helperText={formik.touched.rounds_invest_in && formik.errors.rounds_invest_in}
                />
              )}
            />

            <div className="border rounded p-2 border-gray-400">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="startup_location_preference.global"
                  checked={formik.values.startup_location_preference.global}
                  onChange={formik.handleChange}
                  className="mt-0.5"
                />
                Global
              </label>
            </div>

            {/* Autocomplete for Country */}
            <Autocomplete
              size="small"
              multiple
              disabled={formik.values.startup_location_preference.global}
              id="startup_location_preference_country"
              options={countries} // Define your options
              value={formik.values.startup_location_preference.country}
              onChange={(event, newValue) => {
                formik.setFieldValue("startup_location_preference.country", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="startup_location_preference.country"
                  label="Country"
                  placeholder="Country"
                  error={
                    formik.touched.startup_location_preference &&
                    formik.errors.startup_location_preference &&
                    formik.touched.startup_location_preference.country &&
                    formik.errors.startup_location_preference.country
                  }
                  helperText={
                    formik.touched.startup_location_preference &&
                    formik.errors.startup_location_preference &&
                    formik.touched.startup_location_preference.country &&
                    formik.errors.startup_location_preference.country
                      ? formik.errors.startup_location_preference.country
                      : ""
                  }
                />
              )}
            />

            {/* Autocomplete for State */}
            <Autocomplete
              size="small"
              multiple
              disabled={formik.values.startup_location_preference.global}
              id="startup_location_preference_state"
              options={indianStates} // Define your options
              value={formik.values.startup_location_preference.state}
              onChange={(event, newValue) => {
                formik.setFieldValue("startup_location_preference.state", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="startup_location_preference.state"
                  label="State"
                  placeholder="State"
                  error={
                    formik.touched.startup_location_preference &&
                    formik.errors.startup_location_preference &&
                    formik.touched.startup_location_preference.state &&
                    formik.errors.startup_location_preference.state
                  }
                  helperText={
                    formik.touched.startup_location_preference &&
                    formik.errors.startup_location_preference &&
                    formik.touched.startup_location_preference.state &&
                    formik.errors.startup_location_preference.state
                      ? formik.errors.startup_location_preference.state
                      : ""
                  }
                />
              )}
            />
          </div>
        </div>

        <div className="mt-5 mx-5 bg-white rounded-lg p-5">
          <h2 className="font-semibold text-xl opacity-70">Additional Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 items-center">
            {/* Type */}
            <MySelect
              name="type"
              label="Type"
              options={investorTypes} // Define your options
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.type && formik.errors.type}
              helperText={formik.touched.type && formik.errors.type ? formik.errors.type : ""}
            />

            <Autocomplete
              size="small"
              multiple
              id="deal_structure"
              options={dealStructureOptions} // Define your options
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
            {/* Company Age */}
            <MyInput
              name="startup_min_company_age"
              type="number"
              label="Minimum Company Age in Months"
              placeholder="Enter minimum company age in Months"
              value={formik.values.startup_min_company_age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.startup_min_company_age && formik.errors.startup_min_company_age}
              helperText={
                formik.touched.startup_min_company_age && formik.errors.startup_min_company_age
                  ? formik.errors.startup_min_company_age
                  : ""
              }
            />
            {/* Revenue */}

            <CurrencyInput name="startup_min_revenue" label="Minimum Revenue in USD($)" formik={formik} />

            {/* Valuation Cap */}
            <CurrencyInput
              name="startup_max_valuation_cap"
              type="number"
              label="Maximum Valuation Cap in USD($)"
              formik={formik}
            />

            {/* Checkbox for lead investor required */}
            <div className="border rounded p-2 border-gray-400">
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

            {/* Checkboxes for preference */}
            <div className="border rounded p-2 border-gray-400">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="preference.sc_st_obc"
                  checked={formik.values.preference.sc_st_obc}
                  onChange={formik.handleChange}
                  className="mt-0.5"
                />
                SC/ST/OBC
              </label>
            </div>
            <div className="border rounded p-2 border-gray-400">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="preference.women"
                  checked={formik.values.preference.women}
                  onChange={formik.handleChange}
                  className="mt-0.5"
                />
                Women
              </label>
            </div>
          </div>
        </div>

        {/* Employee section */}
        <div className="mt-5 mx-5 bg-white rounded-lg p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xl opacity-70">All Employees</h2>
            <FilledBtn type="button" text="Add Employee" onClick={handleAddEmployee} />
          </div>

          {employees.map((employee, index) => (
            <div key={index} className="mt-5 border rounded-lg p-4">
              <div className="flex justify-between">
                <h2 className="font-semibold">Employee {index + 1}</h2>
                {index > 0 && (
                  <Icon
                    className="text-xl text-white bg-red-500 size-8 p-1.5 cursor-pointer hover:bg-red-600 rounded-lg"
                    icon="solar:trash-bin-trash-linear"
                    onClick={() => handleRemoveEmployee(index)}
                  />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                <MyInput
                  name={`employees[${index}].first_name`}
                  type="text"
                  label="First Name"
                  placeholder="Enter first name"
                  value={formik.values.employees[index]?.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.employees && formik.errors.employees && formik.errors.employees[index]?.first_name
                  }
                  helperText={
                    formik.touched.employees && formik.errors.employees && formik.errors.employees[index]?.first_name
                  }
                />
                <MyInput
                  name={`employees[${index}].last_name`}
                  type="text"
                  label="Last Name"
                  placeholder="Enter last name"
                  value={formik.values.employees[index]?.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.employees && formik.errors.employees && formik.errors.employees[index]?.last_name
                  }
                  helperText={
                    formik.touched.employees && formik.errors.employees && formik.errors.employees[index]?.last_name
                  }
                />
                <MyInput
                  name={`employees[${index}].phone_number`}
                  type="text"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  value={formik.values.employees[index]?.phone_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.employees && formik.errors.employees && formik.errors.employees[index]?.phone_number
                  }
                  helperText={
                    formik.touched.employees && formik.errors.employees && formik.errors.employees[index]?.phone_number
                  }
                />
                <MyInput
                  name={`employees[${index}].email`}
                  type="text"
                  label="Email"
                  placeholder="Enter email"
                  value={formik.values.employees[index]?.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.employees && formik.errors.employees && formik.errors.employees[index]?.email}
                  helperText={
                    formik.touched.employees && formik.errors.employees && formik.errors.employees[index]?.email
                  }
                />
                <MyInput
                  name={`employees[${index}].linkedin`}
                  type="text"
                  label="LinkedIn"
                  placeholder="Enter LinkedIn profile URL"
                  value={formik.values.employees[index]?.linkedin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.employees && formik.errors.employees && formik.errors.employees[index]?.linkedin
                  }
                  helperText={
                    formik.touched.employees && formik.errors.employees && formik.errors.employees[index]?.linkedin
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 float-right">
          <FilledBtn type="submit" text="Save Investor" onClick={handleAddEmployee} />
        </div>
      </form>
    </>
  );
};

export default AddInvestor;
