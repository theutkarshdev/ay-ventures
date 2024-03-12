import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const employeeSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, "First Name must contain only letters")
    .required("First Name is required"),
  last_name: Yup.string()
    .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, "Last Name must contain only letters")
    .required("Last Name is required"),
  phone_number: Yup.string()
    .matches(/^[\d+()-,]+$/, "Invalid phone format")
    .required("Phone Number is required"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
    .required("Email is Required")
    .required("Email is required"),
  linkedin: Yup.string().required("Linkedin url is required"),
  // Add more fields as needed
});
export const investorValidationSchema = Yup.object({
  firm_email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
    .required("Email is Required")
    .required("Email is Required"),
  firm_name: Yup.string()
    .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, "Firm Name must contain only letters")
    .required("Firm Name is Required"),
  type: Yup.string().required("Type is Required"),
  sector_focus: Yup.array().min(1, "At least one sector focus is required"),
  min_ticket_size: Yup.number()
    .required("Ticket Size is Required")
    .positive("Min Ticket Size must be a positive number"),
  min_ticket_size: Yup.number()
    .required("Ticket Size is Required")
    .positive("max Ticket Size must be a positive number"),
  website: Yup.string().matches(/^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/, "Invalid website URL"),
  date_onboarded: Yup.date().required("Date Onboarded is Required"),
  rounds_invest_in: Yup.array().min(1, "At least one round to invest in is required"),
  deal_structure: Yup.array().min(1, "At least one deal structure is required"),
  startup_min_revenue: Yup.number().required("Revenue is Required").positive("Revenue must be a positive number"),
  startup_min_company_age: Yup.number()
    .required("Company Age is Required")
    .positive("Company Age must be a positive number")
    .integer("Company Age must be an integer"),
  startup_max_valuation_cap: Yup.number()
    .required("Valuation Cap is Required")
    .positive("Valuation Cap must be a positive number"),
  preference: Yup.object().shape({
    sc_st_obc: Yup.boolean(),
    women: Yup.boolean(),
  }),
  employees: Yup.array().of(employeeSchema),
});

const coFounderSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, "First Name must contain only letters")
    .required("First Name is required"),
  last_name: Yup.string()
    .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, "Last Name must contain only letters")
    .required("Last Name is required"),
  phone_number: Yup.string()
    .matches(/^[\d+()-,]+$/, "Invalid phone format")
    .required("Phone Number is required"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
    .required("Email is Required")
    .required("Email is required"),
  linkedin: Yup.string().required("Linkedin url is required"),
  // Add more fields as needed
});
export const startUpValidationSchema = Yup.object().shape({
  dateOnboarded: Yup.date().required("Date onboarded is required"),
  companyName: Yup.string().required("Company name is required"),
  founder: Yup.string()
    .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, "Founder Name must contain only letters")
    .required("Founder name is required"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
    .required("Email is Required"),
  phoneNumber: Yup.string()
    .matches(/^[\d+()-,]+$/, "Invalid phone format")
    .required("Phone number is required"),
  aboutTheCompany: Yup.string().required("About the company is required"),
  businessModel: Yup.string().required("Business model is required"),
  revenue: Yup.number().required("Revenue is required"),
  traction: Yup.string().required("Traction is required"),
  pitchDeck: Yup.string().url("Invalid URL").required("Pitch deck URL is required"),
  businessPlan: Yup.string().url("Invalid URL").required("Business plan URL is required"),
  mIS: Yup.string().url("Invalid URL").required("MIS URL is required"),
  otherDocuments: Yup.string().url("Invalid URL").required("Other documents URL is required"),
  foundingDate: Yup.date().required("Founding date is required"),
  investmentAsk: Yup.number().required("Investment ask is required"),
  valuation: Yup.number().required("Valuation is required"),
  aboutTheTeam: Yup.string().required("About the team is required"),
  sector: Yup.array().min(1, "At least one sector is required"),
  marketSize: Yup.string().required("Market size is required"),
  previousRounds: Yup.string().required("Previous rounds is required"),
  commitments: Yup.string().required("Commitments is required"),
  currentRound: Yup.string().required("Current round is required"),
  deadlineToClose: Yup.date().required("Deadline to close is required"),
  investorTypePreference: Yup.array().min(1, "At least one type preference is required"),
  investorMinimumTicketSize: Yup.number().required("Investor minimum ticket size is required"),
  anyLeadInvestor: Yup.boolean().required("Lead investor requirement is required"),
  uSPAndCompetitors: Yup.string().required("USP and competitors is required"),
  dealStructure: Yup.array().min(1, "At least one deal structure is required"),
  gTM: Yup.string().required("Go-to-market strategy is required"),
  futurePlans: Yup.string().required("Future plans is required"),
  problemAndSolution: Yup.string().required("Problem and solution is required"),
  anyOfTheCofounders_sc_st_obc: Yup.boolean().required("Co-founders SC/ST/OBC status is required"),
  anyOfTheCofoundersWoman: Yup.boolean().required("Co-founders woman status is required"),
  coFounders: Yup.array().of(coFounderSchema),
});
