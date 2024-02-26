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
  Skeleton,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const MyTable = ({ columns, tableDataApi, delApi }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({ data: [], total: 0 });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [delDialog, setDelDialog] = useState({ open: false, id: "", name: "" });
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
    searchParams.set("skip", newSkip.toString());
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    const newSkip = 0;
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    searchParams.set("limit", newRowsPerPage.toString());
    searchParams.set("skip", newSkip.toString());
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  return (
    <div className="mt-5 mx-5 bg-white rounded-lg border">
      <div className="flex justify-between items-center gap-2 border-b py-3 px-3">
        <div className="flex items-center gap-1 w-full max-w-xs py-1.5 px-3 border-2 rounded-lg focus:outline-sky-600">
          <Icon className="text-2xl opacity-50" icon="fluent:text-bullet-list-square-search-20-regular" />
          <input placeholder="Search by Email..." className="w-full outline-none" />
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
                                <Icon
                                  onClick={() => handleView(row)}
                                  className="cursor-pointer p-2 border opacity-70 size-8 rounded-md bg-slate-100 text-xl"
                                  icon={"fluent:eye-16-regular"}
                                />

                                <Icon
                                  onClick={() => handleEdit(row)}
                                  className="cursor-pointer p-2 border opacity-70 size-8 rounded-md bg-slate-100 text-lg"
                                  icon={"fluent:edit-16-regular"}
                                />
                                <Icon
                                  onClick={() => handleDelete(row._id, row.firm_name)}
                                  className="cursor-pointer p-2 border opacity-70 size-8 rounded-md bg-slate-100 text-lg"
                                  icon={"fluent:delete-16-regular"}
                                />
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

        {!loading ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100, 200]}
            component="div"
            count={tableData.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : (
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

function SimpleDialog(props) {
  const { onClose, delData } = props;

  const handleClose = () => {
    onClose();
  };

  const ClickDel = () => {
    onClose(delData?.id);
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: 15,
        },
      }}
      fullWidth
      maxWidth="xs"
      onClose={handleClose}
      open={delData?.open}
    >
      <DialogContent>
        <div className="flex flex-col items-center">
          <Icon
            className="size-[80px] text-red-500 border-2 border-red-500 rounded-full p-3 bg-red-100"
            icon="typcn:warning"
          />
          <h2 className="text-center font-bold text-xl mb-1 mt-3">Are You Sure ??</h2>
          <p className="text-sm opacity-70 text-center">
            This action cannot be undone. All values associated with
            <span className="font-bold text-red-500">{delData?.name}</span> field will be lost.
          </p>
        </div>
        <div className="flex gap-4 mt-5">
          <OutlinedBtn onClick={handleClose} icon={"ion:close-outline"} border="gray" extra="w-1/2" text="Cancel" />
          <FilledBtn onClick={ClickDel} icon={"fluent:delete-16-regular"} bg="red" extra="w-1/2" text="yes, Delete" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
