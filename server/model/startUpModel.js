import { mongoose } from "mongoose";
const { Schema } = mongoose;

// Define main schema for firms
const StartUpSchema = new Schema({
  dateOnboarded: { type: String },
  daysSinceOnboarded: { type: Number },
  companyName: { type: String },
  founder: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  aboutTheCompany: { type: String },
  businessModel: { type: String },
  revenue: { type: Number },
  traction: { type: String },
  pitchDeck: { type: String },
  businessPlan: { type: String },
  mIS: { type: String },
  otherDocuments: { type: String },
  foundingDate: { type: String },
  investmentAsk: { type: Number },
  valuation: { type: Number },
  aboutTheTeam: { type: String },
  sector: { type: [String] },
  marketSize: { type: String },
  previousRounds: { type: String },
  commitments: { type: String },
  currentRound: { type: String },
  locationCountry: { type: String },
  locationState: { type: String },
  deadlineToClose: { type: String },
  investorTypePreference: { type: [String] },
  investorMinimumTicketSize: { type: Number },
  anyLeadInvestor: { type: Boolean },
  uSPAndCompetitors: { type: String },
  dealStructure: { type: [String] },
  investorLocationCountry: { type: [String] },
  investorLocationState: { type: [String] },
  gTM: { type: String },
  futurePlans: { type: String },
  problemAndSolution: { type: String },
  anyOfTheCofounders_sc_st_obc: { type: Boolean },
  anyOfTheCofoundersWoman: { type: Boolean },
  whoHasBeenMailed: { type: [String] },
  whoRejected: { type: [String] },
  openDealflowCount: { type: Number },
  closedDealflowCount: { type: Number },
  totalDealflowCount: { type: Number },
});

// Create the model
const StartUpModel = mongoose.model("StartUp", StartUpSchema);

export default StartUpModel;
