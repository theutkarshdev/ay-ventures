import React, { useState, useEffect } from "react";
import FilledBtn from "../buttons/FilledBtn";
import OutlinedBtn from "../buttons/OutlinedBtn";
import NoDataImg from "../../assets/course_not_found_icon.png";
import { Icon } from "@iconify/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Menu,
  MenuItem,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const MyTable = ({ columns, tableDataApi }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({ data: [], total: 0 });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const limit = searchParams.get("limit") || 5;
    const skip = searchParams.get("skip") || 0;
    setRowsPerPage(Number(limit));
    setPage(Math.floor(Number(skip) / Number(limit)));
    handleTableData(Number(limit), Number(skip));
  }, [searchParams]);

  const handleTableData = async (limit, skip) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/api/${tableDataApi}?limit=${limit}&skip=${skip}`,
      );
      setTableData({
        data: response.data.data,
        total: response.data.total,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (row) => {
    navigate(`edit/${row?._id}`);
    handleMenuClose();
  };

  const handleView = (row) => {
    navigate(`view/${row?._id}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete action here
    handleMenuClose();
  };

  const handleChangePage = (event, newPage) => {
    const newSkip = newPage * rowsPerPage;
    setPage(newPage);
    searchParams.set("skip", newSkip.toString());
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    searchParams.set("limit", newRowsPerPage.toString());
    navigate(`?${searchParams.toString()}`, { replace: true });
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
        {loading || tableData?.data?.length > 0 ? (
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
                {!loading ? (
                  tableData?.data.map((row) => (
                    <TableRow
                      key={row.firm_name}
                      sx={{
                        "&:nth-of-type(even) td": { background: "#eee" },
                      }}
                      tabIndex={-1}
                    >
                      {columns.map((column) => {
                        if (column.id === "actions") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <div className="flex justify-center">
                                <button
                                  className="bg-slate-100 p-1 rounded-md border hover:border-gray-400"
                                  onClick={handleMenuOpen}
                                >
                                  <Icon className="text-xl" icon="pepicons-pencil:dots-y" />
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
                                  <MenuItem
                                    className="flex gap-2 items-center py-1.5 text-sm "
                                    onClick={() => handleView(row)}
                                  >
                                    <Icon className="text-xl" icon={"fluent:eye-16-regular"} />
                                    View
                                  </MenuItem>
                                  <MenuItem
                                    className="flex gap-2 items-center py-1.5 text-sm"
                                    onClick={() => handleEdit(row)}
                                  >
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
                  ))
                ) : (
                  <TableRowsLoader column={columns} rowsNum={rowsPerPage} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <NoData />
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100, 200]}
          component="div"
          count={tableData.total}
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

const TableRowsLoader = ({ rowsNum, column }) => {
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow
      key={index}
      sx={{
        "&:nth-of-type(even) td": { background: "#eee" },
      }}
    >
      {column.map((column, index) => (
        <TableCell key={index} className="py-4">
          <Skeleton className="py-1" animation="wave" variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ));
};

const NoData = () => {
  return (
    <div className="w-full h-80 overflow-hidden grid place-items-center">
      <img className="w-full max-w-[300px]" src={NoDataImg} />
    </div>
  );
};
