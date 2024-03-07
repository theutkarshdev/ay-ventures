import { Skeleton, TableCell, TableRow } from "@mui/material";

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

export default TableRowsLoader;
