import React, { useState, useEffect } from "react";
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
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import SimpleDialog from "./SimpleDialog";
import TableRowsLoader from "./TableRowsLoader";

const MyTable = ({ columns, tableDataApi, delApi, tablePermissions }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({ data: [], total: 0 });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [delDialog, setDelDialog] = useState({ open: false, id: "", name: "" });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchEmail, setSearchEmail] = useState(null);

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

  const handleEdit = (row) => {
    navigate(`edit/${row?._id}`);
  };

  const handleView = (row) => {
    navigate(`view/${row?._id}`);
  };
  const handleDelete = (id, name) => {
    setDelDialog({ open: true, id: id, name: name });
  };

  const handleCloseDeldialog = async (id) => {
    setDelDialog({ open: false });
    try {
      if (id) {
        const response = await axios.delete(`${import.meta.env.VITE_BACK_URL}/api/${delApi}/${id}`);
        if (response.status === 200) {
          toast.success("Successfully Deleted...");
          const limit = searchParams.get("limit") || 5;
          const skip = searchParams.get("skip") || 0;
          setRowsPerPage(Number(limit));
          setPage(Math.floor(Number(skip) / Number(limit)));
          handleTableData(Number(limit), Number(skip));
        } else {
          toast.error("Somthing Went wrong...");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    const newSkip = newPage * rowsPerPage;
    setPage(newPage);
    searchParams.set("skip", newSkip?.toString());
    navigate(`?${searchParams?.toString()}`, { replace: true });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    const newSkip = 0;
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    searchParams.set("limit", newRowsPerPage?.toString());
    searchParams.set("skip", newSkip?.toString());
    navigate(`?${searchParams?.toString()}`, { replace: true });
  };

  return (
    <div className="mt-5 mx-5 bg-white rounded-lg border">
      <div className="flex justify-between items-center gap-2 border-b py-3 px-3">
        <div className="flex items-center gap-1 w-full max-w-xs py-1.5 px-3 border-2 rounded-lg focus:outline-sky-600">
          <Icon className="text-2xl opacity-50" icon="fluent:text-bullet-list-square-search-20-regular" />
          <input
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Search by Email..."
            className="w-full outline-none"
          />
        </div>
        <div className="">
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
                              <div className="flex gap-2 justify-center">
                                {tablePermissions?.view && (
                                  <Icon
                                    onClick={() => handleView(row)}
                                    className="cursor-pointer p-1 border opacity-70 size-6 rounded-md bg-yellow-100 text-yellow-500 border-yellow-500 text-xl"
                                    icon={"fluent:eye-16-regular"}
                                  />
                                )}
                                {tablePermissions?.edit && (
                                  <Icon
                                    onClick={() => handleEdit(row)}
                                    className="cursor-pointer p-1 border opacity-70 size-6 rounded-md bg-blue-100 text-blue-500 border-blue-500 text-lg"
                                    icon={"fluent:edit-16-regular"}
                                  />
                                )}
                                {tablePermissions?.delete && (
                                  <Icon
                                    onClick={() => handleDelete(row._id, row.firm_name)}
                                    className="cursor-pointer p-1 border opacity-70 size-6 rounded-md bg-red-100 text-red-500 border-red-500 text-lg"
                                    icon={"fluent:delete-16-regular"}
                                  />
                                )}
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

        {!loading && tableData?.data?.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100, 200]}
            component="div"
            count={tableData.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}

        {loading && !tableData?.data?.length > 0 && (
          <div className="flex gap-3 justify-end p-4">
            <Skeleton className="py-1 w-40" animation="wave" variant="text" />
            <Skeleton className="py-1 w-32" animation="wave" variant="text" />
            <Skeleton className="py-1 w-20" animation="wave" variant="text" />
          </div>
        )}
      </div>

      <SimpleDialog delData={delDialog} onClose={(id) => handleCloseDeldialog(id)} />
    </div>
  );
};

export default MyTable;

const NoData = () => {
  return (
    <div className="w-full h-80 overflow-hidden grid place-items-center">
      <img className="w-full max-w-[300px]" src={NoDataImg} />
    </div>
  );
};
