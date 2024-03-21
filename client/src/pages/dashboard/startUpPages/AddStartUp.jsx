import React, { useState } from "react";
import { useFormik } from "formik";
import MyInput from "./../../../components/form/MyInput";
import FilledBtn from "./../../../components/buttons/FilledBtn";
import MySelect from "./../../../components/form/MySelect";
import { startUpValidationSchema } from "./../../../utils/validationSchema";
import PageNav from "./../../../components/header/PageNav";
import { Autocomplete, InputAdornment, Tooltip } from "@mui/material";
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
import MyCheckbox from "./../../../components/form/MyCheckBox";

const initialValues = {
  dateOnboarded: "",
  companyName: "",
  founder: "",
  companyLinkedin: "",
  founderLinkedin: "",
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

            <MyInput
              name="companyLinkedin"
              type="url"
              label="Company Linkedin"
              value={formik.values.companyLinkedin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.companyLinkedin && formik.errors.companyLinkedin}
              helperText={
                formik.touched.companyLinkedin && formik.errors.companyLinkedin ? formik.errors.companyLinkedin : ""
              }
            />

            {/* Founder */}
            <MyInput
              name="founder"
              type="text"
              label="Founder Name"
              value={formik.values.founder}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.founder && formik.errors.founder}
              helperText={formik.touched.founder && formik.errors.founder ? formik.errors.founder : ""}
            />

            <MyInput
              name="founderLinkedin"
              type="url"
              label="Founder Linkedin"
              value={formik.values.founderLinkedin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.founderLinkedin && formik.errors.founderLinkedin}
              helperText={
                formik.touched.founderLinkedin && formik.errors.founderLinkedin ? formik.errors.founderLinkedin : ""
              }
            />

            <CurrencyInput name="revenue" label="Revenue in USD($)" placeholder="Revenue in USD($)" formik={formik} />

            {/* Incorporation/Founding Date */}
            <MyInput
              name="foundingDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Incorporation/Founding Date"
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
            <Autocomplete
              size="small"
              options={countries} // Define your options
              value={formik.values.location.country}
              onChange={(event, newValue) => {
                formik.setFieldValue("location.country", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="location.country"
                  label="Current Country"
                  error={formik.touched.location?.country && formik.errors.location?.country}
                  helperText={
                    formik.touched.location?.country && formik.errors.location?.country
                      ? formik.errors.location?.country
                      : ""
                  }
                />
              )}
            />

            <Autocomplete
              size="small"
              disabled={formik.values.location.country !== "India"}
              options={indianStates} // Define your options
              value={formik.values.location.state}
              onChange={(event, newValue) => {
                formik.setFieldValue("location.state", newValue);
              }}
              renderInput={(params) => (
                <MyInput
                  {...params}
                  name="location.state"
                  label="Current State"
                  error={formik.touched.location?.state && formik.errors.location?.state}
                  helperText={
                    formik.touched.location?.state && formik.errors.location?.state ? formik.errors.location?.state : ""
                  }
                />
              )}
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
          <h2 className="font-semibold text-xl opacity-70">Documents Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
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
          </div>
        </div>
        <div className="mt-5 mx-5 bg-white rounded-lg p-5">
          <h2 className="font-semibold text-xl opacity-70">Preferences</h2>
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

            <MyCheckbox
              label="Any Lead Investor"
              name="anyLeadInvestor"
              checked={formik.values.anyLeadInvestor}
              onChange={formik.handleChange}
              tooltip="Does the company have any commitment (soft or hard) from an investor that can lead the entire round as lead investor?"
            />

            {/* Deal Structure Preference */}
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
                  label="Deal Structure Preference"
                  placeholder="Select Deal Structure Preferences"
                  error={formik.touched.dealStructure && Boolean(formik.errors.dealStructure)}
                  helperText={formik.touched.dealStructure && formik.errors.dealStructure}
                />
              )}
            />

            {/* Autocomplete for Country */}
            <Autocomplete
              size="small"
              multiple
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
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        {
                          <Tooltip
                            placement="top"
                            title={
                              <div className="bg-white rounded text-black text-sm my-1 p-3">
                                Does the founder have a preference for investors from a particular country?
                              </div>
                            }
                            arrow
                          >
                            <Icon
                              icon="fluent:info-16-regular"
                              className="text-lg cursor-pointer hover:bg-gray-100 rounded-full"
                            />
                          </Tooltip>
                        }
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />

            {/* Autocomplete for State */}
            <Autocomplete
              size="small"
              multiple
              disabled={!formik.values.investorLocationPreference.country.includes("India")}
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
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        {
                          <Tooltip
                            placement="top"
                            title={
                              <div className="bg-white rounded text-black text-sm my-1 p-3">
                                Does the founder have a preference for investors from a particular Indian state?
                              </div>
                            }
                            arrow
                          >
                            <Icon
                              icon="fluent:info-16-regular"
                              className="text-lg cursor-pointer hover:bg-gray-100 rounded-full"
                            />
                          </Tooltip>
                        }
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
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
            tooltip="<p>Write 2-3 lines defining what the company does exactly. Do not use any vague language. Keep it simple.</p>
            <p><b>Ex-</b> Visa2Fly is a US-based entity catering to India, its first truly online visa application platform. Their mission is to make visa obtaining process as hassle-free as possible. The team ensure that you have access to the most comprehensive and updated information about the types of visas, fees and other specific requirements for the respective countries that you wish to visit. Our vision is to cater its customers with the easiest process to apply for a visa and make sure that customers are satisfied and well provided.</p> 
            "
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <QuillEditor
              formik={formik}
              placeholder="Write some content here..."
              name="aboutTheTeam"
              label="About The Team"
              tooltip={
                "Founding team ,current role and their previous experience.<br/> Ex- 1. Yash Ajmera : (Founder)The Man behind the idea & inception Buy By Scrap Data Scientist from IIIT Bangalore and MBA from ICFA .13+ years of industry experience in strategy, finance, and planning.<br/> 2. Swati ( Cofounder)  The key controller of technical and operation management of business. B.Tech in Computer Science from CTAE, Udaipur, 6+ years of experience in Software Development.<br/> 3. Rajeshwar Mehra : ( COO ) MBA, CS and LLB with 12+ years experience in corporate,  Currently associated with a law firm since 8 years."
              }
            />

            <QuillEditor
              formik={formik}
              placeholder="Write some content here..."
              name="traction"
              label="Traction"
              tooltip={
                "<p>This should include key metrics of the company like revenue,repeat orders , Locations, Downloads, etc. </p><p>Ex-</p> <p>Customers Acquired -  30,000</p><p> Our Current Presence - Goa</p><p> Repeat Order Rate - 80%</p><p> Retail shop - 250+ Restaurants - 55+</p><p> Downloads - 300000</p>"
              }
            />

            <QuillEditor
              formik={formik}
              placeholder="Write some content here..."
              name="businessModel"
              label="Business Model"
              tooltip={
                "<p>How does the company make money? And what is the nature of the business, like B2B, B2C, D2C, etc</p><p><b>Ex-</b> We are Working in both B2B and B2C models through V-Commerce (Village Commerce) that helps in creating and sustaining rural consumption eco-system.</p> <ul style='list-style-type: disc;padding-left:20px;margin-top:7px;'><li>Timely delivery of goods to the customers </li> <li>Quality products at affordable prices</li><li> Micro-Warehouses network for quick service.</li></ul>"
              }
            />

            <QuillEditor
              formik={formik}
              placeholder="Write some content here..."
              name="commitments"
              label="Commitments"
              tooltip={
                "soft or hard finance investments commitments given by any investor<br/> Ex- 2.5cr from FDI Singapore"
              }
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
              tooltip={
                "what makes Companies product or service better than competitors.& Competitors- company, that is trying to compete with companies in similar space.<br/> Ex- USP : Our USP is the Supply Chain Network, which empowers Rural Youth to perform these functions and build rural economy for a good living in rural areas.<br/> Ex- Competitors:  Godrej , farm2fork ,mangrove, ruralpharma.pvtltd"
              }
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
              tooltip={
                "<p>Write about the problem(s) the company is solving and the exact solution they are applying. Make sure the headings of Problem and Solution are bold.</p><p>Ex-</p><br/><p><b>Problem-</b></p><ol style='list-style-type: decimal;padding-left:20px;margin-top:5px;'> <li>High travel time</li><li> Low-quality products are a big challenge</li><li> Crowded market</li><li> No early returns</li><li> Gap in rural and urban areas</li></ol><br/><p><b>Solution-</b></p> <ol style='list-style-type: decimal;padding-left:20px;margin-top:5px;'><li>New brand onboarding a key focus to reach 500 by 2024</li> <li>100+ fashion brands in mid and premium segment</li><li> Average order value 2800/- INR</li><li> Commission model 33-35% retained </li><li>Launched Globally</li></ol>"
              }
            />

            <QuillEditor
              formik={formik}
              placeholder="Write some content here..."
              name="marketSize"
              label="Market Size"
              tooltip={
                "Cumulative figure of number of potential buyers of a product or service within a given market that includes TAM, SAM,SOM <br/>Ex-<br/><ul style='list-style-type: disc;padding-left:20px;margin-top:7px;'> <li>TAM- $3.2 Billion</li><li> SAM - $1.4 Billion</li><li> SOM - $.8 Billion</li></ul>"
              }
            />

            <QuillEditor
              formik={formik}
              placeholder="Write some content here..."
              name="previousRounds"
              label="Previous Rounds"
              tooltip={"funding that a company  has received from private equity investors in previous round<br/> Ex- raised 750 k from finserv capital at 12 Cr valuation in seed round"}
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
