import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const StyledRoot = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  gap: "10px",
}));

export const StyledHeaderBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  margin: "10px 0",
}));

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ffcaec6e",
    color: "#FF65C9",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  textAlign: "center",
  "&:first-of-type ": {
    textAlign: "left",
  },
}));

export const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child": {
    border: 0,
  },
}));

export const StyledButtonBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "20px",
  alignItems: "center",
  width: "100%",
  margin: "10px 0",
}));

export const StyledMainButton = styled(Button)`
  border-radius: 30px;
  background-color: #c4017a;
  min-width: 100px;
  color: white;
  :hover {
    background-color: #c4017a;
  }
`;

export const StyledSimpleButton = styled(Button)`
  border-radius: 30px;
  background-color: #e8e8e8;
  color: #bb5795;
  min-width: 100px;
  :hover {
    background-color: #e8e8e8;
  }
`;

export const Text = styled(Typography)`
  color: #23194c;
`;
