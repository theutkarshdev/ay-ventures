import React from "react";
import { useRoutes } from "react-router-dom";
import { AdminRoutes } from "./utils/appNavigation";

const App = () => {
  const routes = useRoutes(AdminRoutes);
  return routes;
};

export default App;
