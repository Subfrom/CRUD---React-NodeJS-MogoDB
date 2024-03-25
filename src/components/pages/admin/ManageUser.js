import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { list, updateRole } from '../../../functions/user'
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
// icon
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

const ManageUser = () => {

    const [users, setUsers] = useState([])
    const { user } = useSelector((state) => ({...state}));
    console.log(user)

    useEffect(() => {
        loadUsers(user.user.token)
    }, [])

    const loadUsers = async (authtoken) => {
        await list(authtoken).then((res) => {
            setUsers(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const role = ['admin', 'user'];

    
    const handleChangeRole = async (id, e) => {
        // console.log(id, e.target.value)

        const value = {
            id: id,
            role: e.target.value,
        };

        await updateRole(user.user.token, value).then((res) => {
            loadUsers(user.user.token)
        }).catch((err) => {
            console.log(err)
        })
    }


  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>UpdatedAt</TableCell>
              <TableCell>Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              ? users.map((user, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell scope="row">{index + 1}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        <Select
                          onChange={(e) => handleChangeRole(user._id, e)}
                          defaultValue={user.role}
                          style={{ width: "100px" }}
                        >
                          {role.map((r) => (
                            <MenuItem value={r}>{r}</MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell>{user.ip}</TableCell>
                      <TableCell>{user.updatedAt}</TableCell>
                      <TableCell>
                        {/* <Tooltip title="Edit">
                          <IconButton>
                            <Link to={`/edit/${user._id}`}>
                              <EditIcon fontSize="large" color="warning" />
                            </Link>
                          </IconButton>
                        </Tooltip> */}
                        {/* <Tooltip title="Delete">
                          <IconButton>
                            <DeleteForeverIcon
                              fontSize="large"
                              color="error"
                              onClick={() => handleDelete(user._id)}
                            />
                          </IconButton>
                        </Tooltip> */}
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ManageUser