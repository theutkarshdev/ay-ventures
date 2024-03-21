import mongoose  from "mongoose";
const { Schema } = mongoose;

// Define schema for employees
const CoFounderSchema = new Schema({
  first_name: String,
  last_name: String,
  phone_number: String,
  email: String,
  linkedin: String,
});

// Define main schema for firms
const StartUpSchema = new Schema({
  dateOnboarded: String,
  companyName: String,
  companyLinkedIn: String,
  foundersLinkedIn: String,
  founder: String,
  email: String,
  phoneNumber: String,
  location: {
    country: String,
    state: String,
  },
  aboutTheCompany: String,
  businessModel: String,
  revenue: Number,
  traction: String,
  pitchDeck: String,
  businessPlan: String,
  mIS: String,
  otherDocuments: String,
  foundingDate: String,
  investmentAsk: Number,
  valuation: Number,
  aboutTheTeam: String,
  sector: { type: [String] },
  marketSize: String,
  previousRounds: String,
  commitments: String,
  currentRound: String,
  deadlineToClose: String,
  investorTypePreference: { type: [String] },
  investorMinimumTicketSize: Number,
  anyLeadInvestor: { type: Boolean, default: false },
  uSPAndCompetitors: String,
  dealStructure: { type: [String] },
  investorLocationPreference: {
    country: [String],
    state: [String],
  },
  gTM: String,
  futurePlans: String,
  problemAndSolution: String,
  anyOfTheCofounders_sc_st_obc: { type: Boolean, default: false },
  anyOfTheCofoundersWoman: { type: Boolean, default: false },
  coFounders: [CoFounderSchema],
  whoHasBeenMailed: { type: [String] },
  whoRejected: { type: [String] },
  openDealflowCount: Number,
  closedDealflowCount: Number,
  totalDealflowCount: Number,
  synced: { type: Boolean, default: false },
});

// Create the model
const StartUpModel = mongoose.model("StartUp", StartUpSchema);

export default StartUpModel;
