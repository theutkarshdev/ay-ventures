import React from "react";
import FilledBtn from "../buttons/FilledBtn";
import OutlinedBtn from "../buttons/OutlinedBtn";
import { Icon } from "@iconify/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination, Menu, MenuItem } from "@mui/material";

const MyTable = ({ columns, data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // Handle edit action here
    handleMenuClose();
  };

  const handleView = () => {
    // Handle view action here
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete action here
    handleMenuClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="mt-5 mx-5 bg-white rounded-lg border">
      <div className="flex justify-between items-center gap-2 border-b py-3 px-3">
        <div className="flex items-center gap-1 w-full max-w-xs py-2 px-3 border-2 rounded-lg focus:outline-sky-600">
          <Icon className="text-2xl opacity-50" icon="fluent:text-bullet-list-square-search-20-regular" />
          <input placeholder="Search by Email..." className="w-full outline-none" />
        </div>
        <div className="flex gap-2 items-center">
          <FilledBtn icon="solar:filter-linear" text="Filter" />
          <OutlinedBtn icon="circum:export" text="Export" />
        </div>
      </div>

      <div className="w-full">
        <TableContainer>
          <Table aria-label="sticky table">
            <TableHead className="bg-[#0284C7]">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    className="text-sm font-semibold text-white py-2"
                    key={column.id}
                    align={column.align}
                    sx={{
                      maxWidth: 200,
                      minWidth: column.minWidth,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow
                    sx={{
                      "&:nth-child(even) td": { background: "#eee" },
                    }}
                    tabIndex={-1}
                    key={row.firm_name}
                  >
                    {columns.map((column) => {
                      if (column.id === "actions") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <div className="flex justify-center">
                              <button className="bg-slate-100 p-1 rounded-md border hover:border-gray-400">
                                <Icon onClick={handleMenuOpen} className="text-xl" icon="pepicons-pencil:dots-y" />
                              </button>

                              <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                                PaperProps={{
                                  elevation: 0,
                                  sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
                                    boxShadow: "none",
                                    borderRadius: 2,
                                    mt: 1.5,
                                    "&::before": {
                                      content: '""',
                                      display: "block",
                                      position: "absolute",
                                      top: 0,
                                      right: 10,
                                      width: 10,
                                      height: 10,
                                      bgcolor: "background.paper",
                                      transform: "translateY(-50%) rotate(45deg)",
                                      zIndex: 0,
                                    },
                                  },
                                }}
                              >
                                <MenuItem className="flex gap-2 items-center py-1.5 text-sm " onClick={handleView}>
                                  <Icon className="text-xl" icon={"fluent:eye-16-regular"} />
                                  View
                                </MenuItem>
                                <MenuItem className="flex gap-2 items-center py-1.5 text-sm" onClick={handleEdit}>
                                  <Icon className="text-xl" icon={"fluent:edit-16-regular"} />
                                  Edit
                                </MenuItem>
                                <MenuItem className="flex gap-2 items-center py-1.5 text-sm" onClick={handleDelete}>
                                  <Icon className="text-xl" icon={"fluent:delete-16-regular"} />
                                  Delete
                                </MenuItem>
                              </Menu>
                            </div>
                          </TableCell>
                        );
                      } else {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                              maxWidth: 150,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default MyTable;
