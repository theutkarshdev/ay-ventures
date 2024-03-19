import React from "react";
// Import components
import Login from "../pages/auth/Login";
import AddInvestor from "../pages/dashboard/investorPages/AddInvestor";
import Dashboard from "./../pages/dashboard/Dashboard";
import InvestorList from "./../pages/dashboard/investorPages/InvestorList";
import Error404 from "./../pages/error/Error404";
import AdminLayout from "../layouts/AdminLayout";
import EditInvestor from "../pages/dashboard/investorPages/EditInvestor";
import ViewInvestor from "./../pages/dashboard/investorPages/ViewInvestor";
import Error500 from "../pages/error/Error500";
import StartUpList from "./../pages/dashboard/startUpPages/StartUpList";
import AddStartUp from "./../pages/dashboard/startUpPages/AddStartUp";
import ViewStartUp from "./../pages/dashboard/startUpPages/ViewStartUp";
import EditStartUp from "./../pages/dashboard/startUpPages/EditStartUp";
import DealFlowList from "../pages/dashboard/dealFlowPages/DealFlowList";
import MatchMaking from "../pages/dashboard/dealFlowPages/MatchMaking";
import ViewMatch from "../pages/dashboard/dealFlowPages/ViewMatch";

// Create router configuration
export const AdminRoutes = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/investor",
        children: [
          {
            index: true,
            element: <InvestorList />,
          },
          {
            path: "add",
            element: <AddInvestor />,
          },
          {
            path: "view/:id",
            element: <ViewInvestor />,
          },
          {
            path: "edit/:id",
            element: <EditInvestor />,
          },
        ],
      },
      {
        path: "/startup",
        children: [
          {
            index: true,
            element: <StartUpList />,
          },
          {
            path: "add",
            element: <AddStartUp />,
          },
          {
            path: "view/:id",
            element: <ViewStartUp />,
          },
          {
            path: "edit/:id",
            element: <EditStartUp />,
          },
        ],
      },
      {
        path: "/deal-flow",
        children: [
          {
            index: true,
            element: <DealFlowList />,
          },
        ],
      },
      {
        path: "/match-making",
        children: [
          {
            index: true,
            element: <MatchMaking />,
          },
          {
            path: "view/:id",
            element: <ViewMatch />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/error500",
    element: <Error500 />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
