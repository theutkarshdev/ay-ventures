import { mongoose } from "mongoose";
const { Schema } = mongoose;

// Define schema for employees
const EmployeeSchema = new Schema({
  first_name: String,
  last_name: String,
  phone_number: String,
  email: String,
  linkedin: String,
});

// Define main schema for firms
const FirmSchema = new Schema({
  firm_name: String,
  firm_email: String,
  type: String,
  location: {
    country: String,
    state: String,
  },
  sector_focus: [String],
  min_ticket_size: Number,
  max_ticket_size: Number,
  website: String,
  date_onboarded: String,
  rounds_invest_in: [String],
  lead_investor_required: { type: Boolean, default: false },
  deal_structure: [String],
  startup_min_revenue: Number,
  startup_min_company_age: Number,
  startup_max_valuation_cap: Number,
  startup_location_preference: {
    country: [String],
    state: [String],
    global: { type: Boolean, default: false },
  },
  preference: {
    sc_st_obc: { type: Boolean, default: false },
    women: { type: Boolean, default: false },
  },
  employees: [EmployeeSchema], // Embed the Employee schema
});

// Create the model
const InvestorFirmModel = mongoose.model("InvestorFirm", FirmSchema);

export default InvestorFirmModel;
