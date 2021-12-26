import React, {useEffect, useState} from 'react';
import {Product} from "../../models/product";
import axios from "axios";
import Layout from "../../components/Layout";
import {
    Button,
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

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;

    useEffect(() => {
        (
            async () => {
                await axios.get('products').then((res) => {
                    setProducts(res.data);
                })
            }
        )()
    }, []);

    const deleteProduct = async (id: number) => {
        if (window.confirm("Are you sure?")) {
            await axios.delete(`products/${id}`).then((res) => {
                setProducts(products.filter(p => p.id !== id));
            })
        }
    }

    return (
        <Layout>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * perPage, (page + 1) * perPage).map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="right"><img src={product.image} width={50}/></TableCell>
                                <TableCell align="right">{product.title}</TableCell>
                                <TableCell align="right">{product.description}</TableCell>
                                <TableCell align="right">{product.price}</TableCell>
                                <TableCell align="right">
                                    <Button variant={"contained"} color={"secondary"}
                                            onClick={() => deleteProduct(product.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TablePagination count={products.length}
                                         page={page}
                                         onPageChange={(e, newPage) => setPage(newPage)}
                                         rowsPerPage={perPage}
                                         rowsPerPageOptions={[]}/>
                    </TableFooter>
                </Table>
            </TableContainer>

        </Layout>
    );
};

export default Products;