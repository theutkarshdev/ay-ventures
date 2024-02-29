import React from "react";
import { useFormik } from "formik";
import MyInput from "./../../../components/form/MyInput";
import FilledBtn from "./../../../components/buttons/FilledBtn";
import MySelect from "./../../../components/form/MySelect";
import { startUpValidationSchema } from "./../../../utils/validationSchema";
import PageNav from "./../../../components/header/PageNav";
import { Autocomplete } from "@mui/material";
import {
  indianStates,
  investorTypes,
  sectorFocusOptions,
  dealStructureOptions,
  countries,
} from "../../../utils/options";
import axios from "axios";
import toast from "react-hot-toast";

const initialValues = {
  dateOnboarded: "",
  daysSinceOnboarded: 0,
  companyName: "",
  founder: "",
  email: "",
  phoneNumber: "",
  aboutTheCompany: "",
  businessModel: "",
  revenue: 0,
  traction: "",
  pitchDeck: "",
  businessPlan: "",
  mIS: "",
  otherDocuments: "",
  foundingDate: "",
  investmentAsk: 0,
  valuation: 0,
  aboutTheTeam: "",
  sector: [],
  marketSize: "",
  previousRounds: "",
  commitments: "",
  currentRound: "",
  locationCountry: "",
  locationState: "",
  deadlineToClose: "",
  investorTypePreference: [],
  investorMinimumTicketSize: 0,
  anyLeadInvestor: false,
  uSPAndCompetitors: "",
  dealStructure: [],
  investorLocationCountry: [],
  investorLocationState: [],
  gTM: "",
  futurePlans: "",
  problemAndSolution: "",
  anyOfTheCofounders_sc_st_obc: false,
  anyOfTheCofoundersWoman: false,
};

const AddStartUp = () => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: startUpValidationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, { resetForm });
    },
  });

  const handleSubmit = async (values, { resetForm }) => {
    const loadingToastId = toast.loading("Please wait...");
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/api/startup/multi-add`, [values]);
      if (response.status === 201) {
        toast.success("Investor Added Successfully...", { id: loadingToastId });
        resetForm();
      } else {
        toast.error("Facing some error !!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went really wrong...", { id: loadingToastId });
    }
  };

  return (
    <>
      <PageNav
        label={"Add StartUp"}
        btnText={"StartUp List"}
        btnIcon={"solar:users-group-rounded-outline"}
        btnLink="/startup"
      />

      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="mt-5 mx-5 bg-white rounded-lg p-5">
          <h2 className="font-semibold text-xl opacity-70">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {/* Date Onboarded */}
            <MyInput
              name="dateOnboarded"
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Date Onboarded"
              value={formik.values.dateOnboarded}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dateOnboarded && formik.errors.dateOnboarded}
              helperText={
                formik.touched.dateOnboarded && formik.errors.dateOnboarded ? formik.errors.dateOnboarded : ""
              }
            />

            {/* Days Since Onboarded */}
            <MyInput
              name="daysSinceOnboarded"
              type="number"
              label="Days Since Onboarded"
              value={formik.values.daysSinceOnboarded}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.daysSinceOnboarded && formik.errors.daysSinceOnboarded}
              helperText={
                formik.touched.daysSinceOnboarded && formik.errors.daysSinceOnboarded
                  ? formik.errors.daysSinceOnboarded
                  : ""
              }
            />

            {/* Company Name */}
            <MyInput
              name="companyName"
              type="text"
              label="Company Name"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.companyName && formik.errors.companyName}
              helperText={formik.touched.companyName && formik.errors.companyName ? formik.errors.companyName : ""}
            />

            {/* Founder */}
            <MyInput
              name="founder"
              type="text"
              label="Founder"
              value={formik.values.founder}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.founder && formik.errors.founder}
              helperText={formik.touched.founder && formik.errors.founder ? formik.errors.founder : ""}
            />

            {/* Email */}
            <MyInput
              name="email"
              type="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
            />

            {/* Phone Number */}
            <MyInput
              name="phoneNumber"
              type="text"
              label="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phoneNumber && formik.errors.phoneNumber}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ""}
            />

            {/* About The Company */}
            <MyInput
              name="aboutTheCompany"
              type="text"
              label="About The Company"
              value={formik.values.aboutTheCompany}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.aboutTheCompany && formik.errors.aboutTheCompany}
              helperText={
                formik.touched.aboutTheCompany && formik.errors.aboutTheCompany ? formik.errors.aboutTheCompany : ""
              }
            />

            {/* Business Model */}
            <MyInput
              name="businessModel"
              type="text"
              label="Business Model"
              value={formik.values.businessModel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.businessModel && formik.errors.businessModel}
              helperText={
                formik.touched.businessModel && formik.errors.businessModel ? formik.errors.businessModel : ""
              }
            />

            {/* Revenue */}
            <MyInput
              name="revenue"
              type="number"
              label="Revenue in USD($)"
              value={formik.values.revenue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.revenue && formik.errors.revenue}
              helperText={formik.touched.revenue && formik.errors.revenue ? formik.errors.revenue : ""}
            />

            {/* Traction */}
            <MyInput
              name="traction"
              type="text"
              label="Traction"
              value={formik.values.traction}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.traction && formik.errors.traction}
              helperText={formik.touched.traction && formik.errors.traction ? formik.errors.traction : ""}
            />

            {/* Pitch Deck */}
            <MyInput
              name="pitchDeck"
              type="text"
              label="Pitch Deck"
              value={formik.values.pitchDeck}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.pitchDeck && formik.errors.pitchDeck}
              helperText={formik.touched.pitchDeck && formik.errors.pitchDeck ? formik.errors.pitchDeck : ""}
            />

            {/* Business Plan */}
            <MyInput
              name="businessPlan"
              type="text"
              label="Business Plan"
              value={formik.values.businessPlan}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.businessPlan && formik.errors.businessPlan}
              helperText={formik.touched.businessPlan && formik.errors.businessPlan ? formik.errors.businessPlan : ""}
            />

            {/* MIS */}
            <MyInput
              name="mIS"
              type="text"
              label="MIS"
              value={formik.values.mIS}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mIS && formik.errors.mIS}
              helperText={formik.touched.mIS && formik.errors.mIS ? formik.errors.mIS : ""}
            />

            {/* Other Documents */}
            <MyInput
              name="otherDocuments"
              type="text"
              label="Other Documents"
              value={formik.values.otherDocuments}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otherDocuments && formik.errors.otherDocuments}
              helperText={
                formik.touched.otherDocuments && formik.errors.otherDocuments ? formik.errors.otherDocuments : ""
              }
            />

            {/* Founding Date */}
            <MyInput
              name="foundingDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Founding Date"
              value={formik.values.foundingDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.foundingDate && formik.errors.foundingDate}
              helperText={formik.touched.foundingDate && formik.errors.foundingDate ? formik.errors.foundingDate : ""}
            />

            {/* Investment Ask */}
            <MyInput
              name="investmentAsk"
              type="number"
              label="Investment Ask in USD($)"
              value={formik.values.investmentAsk}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.investmentAsk && formik.errors.investmentAsk}
              helperText={
                formik.touched.investmentAsk && formik.errors.investmentAsk ? formik.errors.investmentAsk : ""
              }
            />

            {/* Valuation */}
            <MyInput
              name="valuation"
              type="number"
              label="Valuation in USD($)"
              value={formik.values.valuation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.valuation && formik.errors.valuation}
              helperText={formik.touched.valuation && formik.errors.valuation ? formik.errors.valuation : ""}
            />

            {/* About The Team */}
            <MyInput
              name="aboutTheTeam"
              type="text"
              label="About The Team"
              value={formik.values.aboutTheTeam}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.aboutTheTeam && formik.errors.aboutTheTeam}
              helperText={formik.touched.aboutTheTeam && formik.errors.aboutTheTeam ? formik.errors.aboutTheTeam : ""}
            />

            {/* Sector */}
            <Autocomplete
              size="small"
              multiple
              id="sector"
              options={sectorFocusOptions}
              value={formik.values.sector}
              onChange={(event, newValue) => {
                formik.setFieldValue("sector", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="sector"
                  label="Sector"
                  placeholder="Select sector"
                  error={formik.touched.sector && Boolean(formik.errors.sector)}
                  helperText={formik.touched.sector && formik.errors.sector}
                />
              )}
            />

            {/* Market Size */}
            <MyInput
              name="marketSize"
              type="text"
              label="Market Size"
              value={formik.values.marketSize}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.marketSize && formik.errors.marketSize}
              helperText={formik.touched.marketSize && formik.errors.marketSize ? formik.errors.marketSize : ""}
            />

            {/* Previous Rounds */}
            <MyInput
              name="previousRounds"
              type="text"
              label="Previous Rounds"
              value={formik.values.previousRounds}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.previousRounds && formik.errors.previousRounds}
              helperText={
                formik.touched.previousRounds && formik.errors.previousRounds ? formik.errors.previousRounds : ""
              }
            />

            {/* Commitments */}
            <MyInput
              name="commitments"
              type="text"
              label="Commitments"
              value={formik.values.commitments}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.commitments && formik.errors.commitments}
              helperText={formik.touched.commitments && formik.errors.commitments ? formik.errors.commitments : ""}
            />

            {/* Current Round */}
            <MyInput
              name="currentRound"
              type="text"
              label="Current Round"
              value={formik.values.currentRound}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.currentRound && formik.errors.currentRound}
              helperText={formik.touched.currentRound && formik.errors.currentRound ? formik.errors.currentRound : ""}
            />

            {/* Location Country */}
            <MySelect
              name="locationCountry"
              label="Location Country"
              options={countries}
              value={formik.values.locationCountry}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.locationCountry && formik.errors.locationCountry}
              helperText={
                formik.touched.locationCountry && formik.errors.locationCountry ? formik.errors.locationCountry : ""
              }
            />

            {/* Location State */}
            <MySelect
              name="locationState"
              label="Location State"
              options={indianStates}
              value={formik.values.locationState}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.locationState && Boolean(formik.errors.locationState)}
              helperText={formik.touched.locationState && formik.errors.locationState}
            />

            {/* Deadline to Close */}
            <MyInput
              name="deadlineToClose"
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Deadline to Close"
              value={formik.values.deadlineToClose}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.deadlineToClose && formik.errors.deadlineToClose}
              helperText={
                formik.touched.deadlineToClose && formik.errors.deadlineToClose ? formik.errors.deadlineToClose : ""
              }
            />
          </div>
        </div>

        <div className="mt-5 mx-5 bg-white rounded-lg p-5">
          <h2 className="font-semibold text-xl opacity-70">Investor Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {/* Investor Type Preference */}
            <Autocomplete
              size="small"
              multiple
              id="investorTypePreference"
              options={investorTypes}
              value={formik.values.investorTypePreference}
              onChange={(event, newValue) => {
                formik.setFieldValue("investorTypePreference", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="investorTypePreference"
                  label="Investor Type Preference"
                  placeholder="Select investor types"
                  error={formik.touched.investorTypePreference && Boolean(formik.errors.investorTypePreference)}
                  helperText={formik.touched.investorTypePreference && formik.errors.investorTypePreference}
                />
              )}
            />

            {/* Investor Minimum Ticket Size */}
            <MyInput
              name="investorMinimumTicketSize"
              type="number"
              label="Investor Minimum Ticket Size in USD($)"
              value={formik.values.investorMinimumTicketSize}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.investorMinimumTicketSize && formik.errors.investorMinimumTicketSize}
              helperText={
                formik.touched.investorMinimumTicketSize && formik.errors.investorMinimumTicketSize
                  ? formik.errors.investorMinimumTicketSize
                  : ""
              }
            />

            {/* Any Lead Investor */}
            <div className="border rounded p-2 border-gray-400">
              <label className="flex items-center gap-2 text-sm">
                <input
                  name="anyLeadInvestor"
                  type="checkbox"
                  checked={formik.values.anyLeadInvestor}
                  onChange={formik.handleChange}
                  className="mt-0.5"
                />
                Any Lead Investor
              </label>
            </div>

            {/* USP And Competitors */}
            <MyInput
              name="uSPAndCompetitors"
              type="text"
              label="USP And Competitors"
              value={formik.values.uSPAndCompetitors}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.uSPAndCompetitors && formik.errors.uSPAndCompetitors}
              helperText={
                formik.touched.uSPAndCompetitors && formik.errors.uSPAndCompetitors
                  ? formik.errors.uSPAndCompetitors
                  : ""
              }
            />

            {/* Deal Structure */}
            <Autocomplete
              size="small"
              multiple
              id="dealStructure"
              options={dealStructureOptions}
              value={formik.values.dealStructure}
              onChange={(event, newValue) => {
                formik.setFieldValue("dealStructure", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="dealStructure"
                  label="Deal Structure"
                  placeholder="Select deal structures"
                  error={formik.touched.dealStructure && Boolean(formik.errors.dealStructure)}
                  helperText={formik.touched.dealStructure && formik.errors.dealStructure}
                />
              )}
            />

            {/* Investor Location Country */}
            <Autocomplete
              size="small"
              multiple
              id="investorLocationCountry"
              options={countries}
              value={formik.values.investorLocationCountry}
              onChange={(event, newValue) => {
                formik.setFieldValue("investorLocationCountry", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="investorLocationCountry"
                  label="Investor Location Country"
                  placeholder="Select countries"
                  error={formik.touched.investorLocationCountry && Boolean(formik.errors.investorLocationCountry)}
                  helperText={formik.touched.investorLocationCountry && formik.errors.investorLocationCountry}
                />
              )}
            />

            {/* Investor Location State */}
            <Autocomplete
              size="small"
              multiple
              id="investorLocationState"
              options={indianStates}
              value={formik.values.investorLocationState}
              onChange={(event, newValue) => {
                formik.setFieldValue("investorLocationState", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="investorLocationState"
                  label="Investor Location State"
                  placeholder="Select states"
                  error={formik.touched.investorLocationState && Boolean(formik.errors.investorLocationState)}
                  helperText={formik.touched.investorLocationState && formik.errors.investorLocationState}
                />
              )}
            />

            {/* GTM */}
            <MyInput
              name="gTM"
              type="text"
              label="Go To Market Strategy (GTM)"
              value={formik.values.gTM}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gTM && formik.errors.gTM}
              helperText={formik.touched.gTM && formik.errors.gTM ? formik.errors.gTM : ""}
            />

            {/* Future Plans */}
            <MyInput
              name="futurePlans"
              type="text"
              label="Future Plans"
              value={formik.values.futurePlans}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.futurePlans && formik.errors.futurePlans}
              helperText={formik.touched.futurePlans && formik.errors.futurePlans ? formik.errors.futurePlans : ""}
            />

            {/* Problem And Solution */}
            <MyInput
              name="problemAndSolution"
              type="text"
              label="Problem And Solution"
              value={formik.values.problemAndSolution}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.problemAndSolution && formik.errors.problemAndSolution}
              helperText={
                formik.touched.problemAndSolution && formik.errors.problemAndSolution
                  ? formik.errors.problemAndSolution
                  : ""
              }
            />

            {/* SC/ST/OBC Cofounders */}

            <div className="border rounded p-2 border-gray-400">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="anyOfTheCofounders_sc_st_obc"
                  checked={formik.values.anyOfTheCofounders_sc_st_obc}
                  onChange={formik.handleChange}
                  className="mt-0.5"
                />
                Any of the Cofounders SC/ST/OBC
              </label>
            </div>

            {/* Woman Cofounders */}
            <div className="border rounded p-2 border-gray-400">
              <label className="flex items-center gap-2 text-sm">
                <input
                  name="anyOfTheCofoundersWoman"
                  type="checkbox"
                  checked={formik.values.anyOfTheCofoundersWoman}
                  onChange={formik.handleChange}
                  className="mt-0.5"
                />
                Any of the Cofounders Woman
              </label>
            </div>
          </div>
        </div>

        <div className="mx-5 float-right">
          <FilledBtn type="submit" extra="my-10" iconRight={true} icon="solar:arrow-right-linear" text="Save StartUp" />
        </div>
      </form>
    </>
  );
};

export default AddStartUp;