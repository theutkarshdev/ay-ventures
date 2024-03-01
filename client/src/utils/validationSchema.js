import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const employeeSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "First Name must contain only letters")
    .required("First Name is required"),
  last_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Last Name must contain only letters")
    .required("Last Name is required"),
  phone_number: Yup.string().required("Phone Number is required"),
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
  firm_name: Yup.string().required("Firm Name is Required"),
  type: Yup.string().required("Type is Required"),
  sector_focus: Yup.array().min(1, "At least one sector focus is required"),
  ticket_size: Yup.number().required("Ticket Size is Required").positive("Ticket Size must be a positive number"),
  website: Yup.string().required("Website is Required"),
  date_onboarded: Yup.date().required("Date Onboarded is Required"),
  rounds_invest_in: Yup.array().min(1, "At least one round to invest in is required"),
  deal_structure: Yup.array().min(1, "At least one deal structure is required"),
  revenue: Yup.number().required("Revenue is Required").positive("Revenue must be a positive number"),
  company_age: Yup.number()
    .required("Company Age is Required")
    .positive("Company Age must be a positive number")
    .integer("Company Age must be an integer"),
  valuation_cap: Yup.number().required("Valuation Cap is Required").positive("Valuation Cap must be a positive number"),
  // already_emailed: Yup.array().min(1, "At least one selected startup is required"),
  // no_response_at_all: Yup.array().min(1, "At least one rejected startup is required"),
  // open_dealflow_count: Yup.number()
  //   .required("Open Dealflow Count is Required")
  //   .positive("Open Dealflow Count must be a positive number"),
  // closed_dealflow_count: Yup.number()
  //   .required("Closed Dealflow Count is Required")
  //   .positive("Closed Dealflow Count must be a positive number"),
  // total_dealflow_count: Yup.number()
  //   .required("Total Dealflow Count is Required")
  //   .positive("Total Dealflow Count must be a positive number"),
  // geography: Yup.object().shape({
  //   country: Yup.array().min(1, "At least one country is required"),
  // }),
  preference: Yup.object().shape({
    sc_st_obc: Yup.boolean(),
    women: Yup.boolean(),
  }),
  employees: Yup.array().of(employeeSchema),
});

export const startUpValidationSchema = Yup.object().shape({
  dateOnboarded: Yup.date().required("Date onboarded is required"),
  daysSinceOnboarded: Yup.number().required("Days since onboarded is required"),
  companyName: Yup.string().required("Company name is required"),
  founder: Yup.string().required("Founder name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
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
  sector: Yup.array().of(Yup.string().required("At least one sector is required")).required("Sector focus is required"),
  marketSize: Yup.string().required("Market size is required"),
  previousRounds: Yup.string().required("Previous rounds is required"),
  commitments: Yup.string().required("Commitments is required"),
  currentRound: Yup.string().required("Current round is required"),
  locationCountry: Yup.string().required("Location country is required"),
  locationState: Yup.string().required("Location state is required"),
  deadlineToClose: Yup.date().required("Deadline to close is required"),
  investorTypePreference: Yup.array().of(Yup.string()).required("Investor type preference is required"),
  investorMinimumTicketSize: Yup.number().required("Investor minimum ticket size is required"),
  anyLeadInvestor: Yup.boolean().required("Lead investor requirement is required"),
  uSPAndCompetitors: Yup.string().required("USP and competitors is required"),
  dealStructure: Yup.array().of(Yup.string()).required("Deal structure is required"),
  investorLocationCountry: Yup.array().of(Yup.string()).required("Investor location country is required"),
  investorLocationState: Yup.array().of(Yup.string()).required("Investor location state is required"),
  gTM: Yup.string().required("Go-to-market strategy is required"),
  futurePlans: Yup.string().required("Future plans is required"),
  problemAndSolution: Yup.string().required("Problem and solution is required"),
  anyOfTheCofounders_sc_st_obc: Yup.boolean().required("Co-founders SC/ST/OBC status is required"),
  anyOfTheCofoundersWoman: Yup.boolean().required("Co-founders woman status is required"),
});
