import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is Required"),
  password: Yup.string().required("Password is Required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
});

export const investorValidationSchema = Yup.object({
  firm_email: Yup.string().email("Invalid email address").required("Email is Required"),
  firm_name: Yup.string().required("Firm Name is Required"),
  type: Yup.string().required("Type is Required"),
  sector_focus: Yup.array().min(1, "At least one sector focus is required"),
  ticket_size: Yup.number().required("Ticket Size is Required").positive("Ticket Size must be a positive number"),
  website: Yup.string().url("Invalid website URL").required("Website is Required"),
  date_onboarded: Yup.date().required("Date Onboarded is Required"),
  rounds_invest_in: Yup.array().min(1, "At least one round to invest in is required"),
  deal_structure: Yup.array().min(1, "At least one deal structure is required"),
  revenue: Yup.number().required("Revenue is Required").positive("Revenue must be a positive number"),
  company_age: Yup.number()
    .required("Company Age is Required")
    .positive("Company Age must be a positive number")
    .integer("Company Age must be an integer"),
  valuation_cap: Yup.number().required("Valuation Cap is Required").positive("Valuation Cap must be a positive number"),
  who_selected: Yup.array().min(1, "At least one selected startup is required"),
  who_rejected: Yup.array().min(1, "At least one rejected startup is required"),
  open_dealflow_count: Yup.number()
    .required("Open Dealflow Count is Required")
    .positive("Open Dealflow Count must be a positive number"),
  closed_dealflow_count: Yup.number()
    .required("Closed Dealflow Count is Required")
    .positive("Closed Dealflow Count must be a positive number"),
  total_dealflow_count: Yup.number()
    .required("Total Dealflow Count is Required")
    .positive("Total Dealflow Count must be a positive number"),
  geography: Yup.object().shape({
    country: Yup.string().required("Country is Required"),
    state: Yup.string().required("State is Required"),
    location: Yup.array().min(1, "At least one location is required"),
  }),
  preference: Yup.object().shape({
    sc_st_obc: Yup.boolean(),
    women: Yup.boolean(),
  }),
});
