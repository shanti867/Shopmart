import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Breadcrum from "../../../Components/Breadcrum";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser, deleteUser, updateStatusUser } from "../../../Redux/ActionCreators/UserActionCreators";

export default function AdminUserPage() {

    const dispatch = useDispatch();
    const data = useSelector(state => state.UserStateData);
    const [search, setSearch] = useState("");

    function updateRecord(id) {
        if (window.confirm("Are You Sure to Change Status of This Record?")) {

            let user = data.find(x => x.id === id);
            if (!user) {
                return;
            }
            dispatch(updateStatusUser({
                id: user.id,
                status: !user.status
            }));
        }
    }

    useEffect(() => {
        dispatch(getUser());
    }, []);

    function deleteRecord(id) {
        if (window.confirm("Are You Sure To Delete This Record")) {
            dispatch(deleteUser({ id }));
        }
    }

    const filteredData = data.filter(row =>
        row.name?.toLowerCase().includes(search.toLowerCase()) ||
        row.UserId?.toLowerCase().includes(search.toLowerCase()) ||
        row.shortDescription?.toLowerCase().includes(search.toLowerCase()) ||
        (row.status ? "active" : "inactive").includes(search.toLowerCase())
    );

    const columns = [
        {
            name: "Id",
            selector: row => row.userId,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
            width: "200px"

        },
        {
            name: "Username",
            selector: row => row.username,
            sortable: true,
            width: "200px"
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
            width: "200px"
        },
        {
            name: "Phone",
            selector: row => row.phone,
            sortable: true,
            width: "200px"
        },
        {
            name: "Role",
            selector: row => row.role,
            sortable: true,
        },
        {
            name: "Status",
            width: "120px",
            cell: row => (
                <button
                    className={`btn ${row.status ? "btn-success" : "btn-secondary"}`}
                    onClick={() => {
                        updateRecord(row.id)
                    }}>
                    {row.status ? "Active" : "Inactive"}
                </button>
            ),
            sortable: true
        },
        // {
        //     name: "Update",
        //     cell: row => (
        // <Link to={`/admin/user/update/${row.id}`} className="btn btn-primary">
        //     <i className="bi bi-pencil-square"></i>
        // </Link>
        //     )
        // },

        {
            name: "Update",
            cell: row => (
                row.role === "Buyer" ? null : <Link to={`/admin/user/update/${row.id}`} className="btn btn-primary">
                    <i className="bi bi-pencil-square"></i>
                </Link>
            )
        },
        {
            name: "Delete",
            cell: row => (
                <button className="btn btn-danger" onClick={() => deleteRecord(row.id)}>
                    <i className="bi bi-x"></i>
                </button>
            )
        }
    ];

    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className="bg-primary text-light text-center p-2">
                            User
                            <Link to="/admin/user/create">
                                <i className="bi bi-plus text-light float-end"></i>
                            </Link>
                        </h5>
                        <input
                            type="text"
                            className="form-control mb-3 w-25 float-end"
                            placeholder="Search User..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            striped
                            highlightOnHover
                            responsive
                            persistTableHead
                        />
                    </div>
                </div>
            </div>
        </>
    );
}