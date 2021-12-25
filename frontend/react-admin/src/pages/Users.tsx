import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import axios from "axios";
import {User} from "../models/user";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;

    useEffect(() => {
        (
            async () => {
                await axios.get('ambassadors').then((res) => {
                    setUsers(res.data);
                })
            }
        )()
    }, []);

    return (
        <Layout>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * perPage, (page + 1) * perPage).map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell align="right">{user.first_name} {user.last_name}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TablePagination count={users.length} page={page}
                                         rowsPerPageOptions={[]}
                                         onPageChange={(e, newPage) => setPage(newPage)} rowsPerPage={perPage}/>
                    </TableFooter>
                </Table>
            </TableContainer>

        </Layout>
    );
};

export default Users;
