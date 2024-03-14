import React, { useState } from "react";
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
  roundInvestOptions,
} from "../../../utils/options";
import axios from "axios";
import toast from "react-hot-toast";
import QuillEditor from "../../../components/form/QuillEditor";
import { Icon } from "@iconify/react";
import CurrencyInput from "../../../components/form/CurrencyInput";

const initialValues = {
  dateOnboarded: "",
  companyName: "",
  founder: "",
  email: "",
  location: {
    country: "",
    state: "",
  },
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
  deadlineToClose: "",
  investorTypePreference: [],
  investorMinimumTicketSize: 0,
  anyLeadInvestor: false,
  uSPAndCompetitors: "",
  dealStructure: [],
  investorLocationPreference: {
    country: [],
    state: [],
  },
  gTM: "",
  futurePlans: "",
  problemAndSolution: "",
  anyOfTheCofounders_sc_st_obc: false,
  anyOfTheCofoundersWoman: false,
  coFounders: [
    {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      linkedin: "",
    },
  ],
};

const AddStartUp = () => {
  const [coFounders, setCoFounders] = useState(initialValues.coFounders);

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
        toast.success("Startup Added Successfully...", { id: loadingToastId });
        setCoFounders(initialValues.coFounders);
        resetForm();
      } else {
        toast.error("Facing some error !!", { id: loadingToastId });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went really wrong...", { id: loadingToastId });
    }
  };

  const handleAddCoFounder = () => {
    // Create a new coFounder object
    const newCoFounder = { first_name: "", last_name: "", phone_number: "", email: "", linkedin: "" };

    // Update the formik values for coFounders
    formik.setValues((prevValues) => ({
      ...prevValues,
      coFounders: [...prevValues.coFounders, newCoFounder],
    }));

    // Update the local state
    setCoFounders([...coFounders, newCoFounder]);
  };

  const handleRemoveCoFounder = (index) => {
    // Remove coFounder from Formik values
    formik.setValues((prevValues) => ({
      ...prevValues,
      coFounders: prevValues.coFounders.filter((_, i) => i !== index),
    }));

    // Remove coFounder from local state
    setCoFounders((prevCoFounders) => prevCoFounders.filter((_, i) => i !== index));
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

            <CurrencyInput name="revenue" label="Revenue in USD($)" placeholder="Revenue in USD($)" formik={formik} />

            {/* MIS */}
            <MyInput
              name="mIS"
              type="url"
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
              type="url"
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
            <CurrencyInput name="investmentAsk" label="Investment Ask in USD($)" formik={formik} />

            {/* Valuation */}
            <CurrencyInput name="valuation" label="Valuation in USD($)" formik={formik} />

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

            <MyInput
              name="pitchDeck"
              type="url"
              label="Pitch Deck"
              value={formik.values.pitchDeck}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.pitchDeck && formik.errors.pitchDeck}
              helperText={formik.touched.pitchDeck && formik.errors.pitchDeck ? formik.errors.pitchDeck : ""}
            />

            <MyInput
              name="businessPlan"
              type="url"
              label="Business Plan"
              value={formik.values.businessPlan}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.businessPlan && formik.errors.businessPlan}
              helperText={formik.touched.businessPlan && formik.errors.businessPlan ? formik.errors.businessPlan : ""}
            />

            {/* Current Round */}
            <MySelect
              name="currentRound"
              label="Current Round"
              options={roundInvestOptions}
              value={formik.values.currentRound}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.currentRound && formik.errors.currentRound}
              helperText={formik.touched.currentRound && formik.errors.currentRound ? formik.errors.currentRound : ""}
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
          <h2 className="font-semibold text-xl opacity-70">StartUp Preferences</h2>
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
            <CurrencyInput
              name="investorMinimumTicketSize"
              label="Investor Minimum Ticket Size in USD($)"
              formik={formik}
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

            {/* Autocomplete for Country */}
            <Autocomplete
              size="small"
              multiple
              disabled={formik.values.investorLocationPreference.global}
              id="investorLocationPreference_country"
              options={countries} // Define your options
              value={formik.values.investorLocationPreference.country}
              onChange={(event, newValue) => {
                formik.setFieldValue("investorLocationPreference.country", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="investorLocationPreference.country"
                  label="Preference Country"
                  placeholder="Country"
                  error={
                    formik.touched.investorLocationPreference &&
                    formik.errors.investorLocationPreference &&
                    formik.touched.investorLocationPreference.country &&
                    formik.errors.investorLocationPreference.country
                  }
                  helperText={
                    formik.touched.investorLocationPreference &&
                    formik.errors.investorLocationPreference &&
                    formik.touched.investorLocationPreference.country &&
                    formik.errors.investorLocationPreference.country
                      ? formik.errors.investorLocationPreference.country
                      : ""
                  }
                />
              )}
            />

            {/* Autocomplete for State */}
            <Autocomplete
              size="small"
              multiple
              disabled={formik.values.investorLocationPreference.global}
              id="investorLocationPreference_state"
              options={indianStates} // Define your options
              value={formik.values.investorLocationPreference.state}
              onChange={(event, newValue) => {
                formik.setFieldValue("investorLocationPreference.state", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="investorLocationPreference.state"
                  label="Preference State"
                  placeholder="State"
                  error={
                    formik.touched.investorLocationPreference &&
                    formik.errors.investorLocationPreference &&
                    formik.touched.investorLocationPreference.state &&
                    formik.errors.investorLocationPreference.state
                  }
                  helperText={
                    formik.touched.investorLocationPreference &&
                    formik.errors.investorLocationPreference &&
                    formik.touched.investorLocationPreference.state &&
                    formik.errors.investorLocationPreference.state
                      ? formik.errors.investorLocationPreference.state
                      : ""
                  }
                />
              )}
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

        <div className="mt-5 mx-5 bg-white rounded-lg p-5">
          <h2 className="font-semibold text-xl opacity-70 mb-5">All Details</h2>

          <QuillEditor
            formik={formik}
            placeholder="Write some content here..."
            name="aboutTheCompany"
            label="About The Company"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <QuillEditor
              formik={formik}
              placeholder="Write some content here..."
              name="aboutTheTeam"
              label="About The Team"
            />

            <QuillEditor formik={formik} placeholder="Write some content here..." name="traction" label="Traction" />

            <QuillEditor
              formik={formik}
              placeholder="Write some content here..."
              name="businessModel"
              label="Business Model"
            />

            <QuillEditor
              formik={formik}
              placeholder="Write some content here..."
              name="commitments"
              label="Commitments"
            />

            <QuillEditor
              formik={formik}
              placeholder="Write some content here..."
              name="gTM"
              label="Go To Market Strategy (GTM)"
            />

            <QuillEditor
              formik={formik}
              placeholder="Write some content here..."
              name="uSPAndCompetitors"
              label="USP And Competitors"
            />

            <QuillEditor
              formik={formik}
              placeholder="Write some content here..."
              name="futurePlans"
              label="Future Plans"
            />

            <QuillEditor
              formik={formik}
              placeholder="Write some content here..."
              name="problemAndSolution"
              label="Problem And Solution"
            />
          </div>
        </div>

        {/* CoFounder section */}
        <div className="mt-5 mx-5 bg-white rounded-lg p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xl opacity-70">All CoFounders</h2>
            <FilledBtn type="button" text="Add CoFounder" onClick={handleAddCoFounder} />
          </div>

          {coFounders.map((coFounder, index) => (
            <div key={index} className="mt-5 border rounded-lg p-4">
              <div className="flex justify-between">
                <h2 className="font-semibold">CoFounder {index + 1}</h2>
                {index > 0 && (
                  <Icon
                    className="text-xl text-white bg-red-500 size-8 p-1.5 cursor-pointer hover:bg-red-600 rounded-lg"
                    icon="solar:trash-bin-trash-linear"
                    onClick={() => handleRemoveCoFounder(index)}
                  />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                <MyInput
                  name={`coFounders[${index}].first_name`}
                  type="text"
                  label="First Name"
                  placeholder="Enter first name"
                  value={formik.values.coFounders[index]?.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.coFounders && formik.errors.coFounders && formik.errors.coFounders[index]?.first_name
                  }
                  helperText={
                    formik.touched.coFounders && formik.errors.coFounders && formik.errors.coFounders[index]?.first_name
                  }
                />
                <MyInput
                  name={`coFounders[${index}].last_name`}
                  type="text"
                  label="Last Name"
                  placeholder="Enter last name"
                  value={formik.values.coFounders[index]?.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.coFounders && formik.errors.coFounders && formik.errors.coFounders[index]?.last_name
                  }
                  helperText={
                    formik.touched.coFounders && formik.errors.coFounders && formik.errors.coFounders[index]?.last_name
                  }
                />
                <MyInput
                  name={`coFounders[${index}].phone_number`}
                  type="text"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  value={formik.values.coFounders[index]?.phone_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.coFounders &&
                    formik.errors.coFounders &&
                    formik.errors.coFounders[index]?.phone_number
                  }
                  helperText={
                    formik.touched.coFounders &&
                    formik.errors.coFounders &&
                    formik.errors.coFounders[index]?.phone_number
                  }
                />
                <MyInput
                  name={`coFounders[${index}].email`}
                  type="text"
                  label="Email"
                  placeholder="Enter email"
                  value={formik.values.coFounders[index]?.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.coFounders && formik.errors.coFounders && formik.errors.coFounders[index]?.email
                  }
                  helperText={
                    formik.touched.coFounders && formik.errors.coFounders && formik.errors.coFounders[index]?.email
                  }
                />
                <MyInput
                  name={`coFounders[${index}].linkedin`}
                  type="text"
                  label="LinkedIn"
                  placeholder="Enter LinkedIn profile URL"
                  value={formik.values.coFounders[index]?.linkedin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.coFounders && formik.errors.coFounders && formik.errors.coFounders[index]?.linkedin
                  }
                  helperText={
                    formik.touched.coFounders && formik.errors.coFounders && formik.errors.coFounders[index]?.linkedin
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mx-5 float-right">
          <FilledBtn type="submit" extra="my-10" iconRight={true} icon="solar:arrow-right-linear" text="Save StartUp" />
        </div>
      </form>
    </>
  );
};

export default AddStartUp;
