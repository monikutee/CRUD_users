import React from "react";
import { Context } from "../contextStore";
import { useNavigate } from "react-router-dom";
import { chunk } from "lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import {
  Text,
  StyledRoot,
  StyledHeaderBox,
  StyledTableCell,
  StyledTableRow,
  StyledMainButton,
} from "./styled";
import { updateUsers } from "../services/usersAPI";
import { User } from "../types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const USERS_PER_PAGE = 10;
export const Home: React.FC = () => {
  const { users, setUsers, setSelected } = React.useContext(Context);
  const navigate = useNavigate();

  const [page, setPage] = React.useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const userPages = chunk(users, USERS_PER_PAGE);

  const handleDelete = (user: User) => {
    const findIndex = users.findIndex((el) => el.id === user.id);
    if (findIndex !== -1) {
      users.splice(findIndex, 1);
    }
    updateUsers(users);
    setUsers([...users]);
  };

  const handleEdit = (user: User) => {
    setSelected(user);
    navigate("/edit");
  };

  return (
    <StyledRoot>
      <StyledHeaderBox>
        <Text variant="h6">Users</Text>
        <Link href="/add" underline="none">
          <StyledMainButton variant="contained">Create new</StyledMainButton>
        </Link>
      </StyledHeaderBox>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userPages.length > 0 &&
              userPages[page - 1].map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell scope="row">
                    {user.firstName}
                  </StyledTableCell>
                  <StyledTableCell>{user.lastName}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>{user.country}</StyledTableCell>
                  <StyledTableCell>{user.address}</StyledTableCell>
                  <StyledTableCell
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleDelete(user)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => handleEdit(user)}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={userPages.length}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </StyledRoot>
  );
};
