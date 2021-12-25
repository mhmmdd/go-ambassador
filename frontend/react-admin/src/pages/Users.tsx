import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import axios from "axios";
import {User} from "../models/user";

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
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
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => {
                    return (
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.email}</td>
                            <td></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </Layout>
    );
};

export default Users;
