import React, {useEffect, useState} from 'react';
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
import Layout from "../components/Layout";
import {Link} from "../models/link";
import axios from "axios";
import {useParams} from 'react-router-dom';

const Links = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;
    const {id} = useParams();

    useEffect(() => {
        (
            async () => {
                await axios.get(`users/${id}/links`).then((res) => {
                    setLinks(res.data);
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
                            <TableCell align="right">Code</TableCell>
                            <TableCell align="right">Count</TableCell>
                            <TableCell align="right">Revenue</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {links.slice(page * perPage, (page + 1) * perPage).map((link) => (
                            <TableRow
                                key={link.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {link.id}
                                </TableCell>
                                <TableCell align="right">{link.code}</TableCell>
                                <TableCell align="right">{link.orders == null ? '' : link.orders.length}</TableCell>
                                <TableCell
                                    align="right">{link.orders == null ? '' : link.orders.reduce((s, o) => s + o.total, 0)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TablePagination count={links.length} page={page}
                                         rowsPerPageOptions={[]}
                                         onPageChange={(e, newPage) => setPage(newPage)} rowsPerPage={perPage}/>
                    </TableFooter>
                </Table>
            </TableContainer>

        </Layout>
    );
};

export default Links;