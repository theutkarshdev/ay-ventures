import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { text: "Dashboard", icon: "radix-icons:dashboard", path: "/" },
  { text: "Investor Management", icon: "solar:users-group-rounded-linear", path: "/investor" },
  { text: "StartUp Management", icon: "solar:buildings-2-broken", path: "/startup" },
  { text: "User Management", icon: "solar:user-linear", path: "/user" },
  { text: "Deal Flow", icon: "fluent:cloud-flow-24-regular", path: "/deal-flow" },
];

const AdminLinks = () => {
  const location = useLocation();

  return (
    <List>
      {links.map((link, index) => (
        <Link to={link.path} key={index}>
          <ListItem className="py-0 my-3">
            <ListItemButton
              className={`py-1.5 px-3 rounded-md ${
                (link.path === "/" && location.pathname === "/") ||
                (location.pathname.startsWith(link.path) && link.path !== "/")
                  ? "bg-sky-600 text-white hover:bg-sky-700"
                  : "bg-transparent"
              }`}
            >
              <ListItemIcon className="min-w-8">
                <Icon
                  className={`text-xl ${
                    (link.path === "/" && location.pathname === "/") ||
                    (location.pathname.startsWith(link.path) && link.path !== "/")
                      ? "text-white"
                      : ""
                  }`}
                  icon={link.icon}
                />
              </ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default AdminLinks;
