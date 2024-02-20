import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppBar, Drawer, Toolbar, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import AdminLinks from "./AdminLinks";
import Logo2 from "../assets/logo2.png";
import AccountDropdown from "../components/header/AccountDropdown";

const AdminLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex">
      <div className="ml-auto h-screen overflow-hidden w-full lg:w-[calc(100vw_-_250px)]">
        <AppBar position="fixed" className="shadow-none p-0 h-12 bg-white text-black border-b z-[1201]">
          <Toolbar className="min-h-12 flex justify-between items-center">
            <div className="flex gap-1 items-center justify-start">
              <IconButton edge="start" color="inherit" aria-label="menu" className="lg:hidden" onClick={toggleDrawer}>
                <Icon icon="gg:menu-left" />
              </IconButton>

              <img className="w-32" src={Logo2} />
            </div>
            <AccountDropdown />
          </Toolbar>
        </AppBar>

        <main className="py-12 bg-slate-100 h-screen overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <Drawer className="hidden lg:block" variant="permanent" anchor="left" open={isDrawerOpen}>
        <div className="w-[250px] mt-12 h-90vh overflow-y-auto">
          <AdminLinks />
        </div>
      </Drawer>

      <Drawer className="block lg:hidden" variant="temporary" anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <div className="w-[250px] mt-12 h-90vh overflow-y-auto">
          <AdminLinks />
        </div>
      </Drawer>
    </div>
  );
};

export default AdminLayout;
