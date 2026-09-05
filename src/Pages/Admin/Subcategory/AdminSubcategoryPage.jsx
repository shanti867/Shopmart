import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Breadcrum from "../../../Components/Breadcrum";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    getSubcategory,
    deleteSubcategory
} from "../../../Redux/ActionCreators/SubcategoryActionCreators";

export default function AdminSubcategoryPage() {

    const dispatch = useDispatch();

    const data = useSelector(state => state.SubcategoryStateData);
    const [search, setSearch] = useState("");
    useEffect(() => {
        dispatch(getSubcategory());
    }, []);

    function deleteRecord(id) {

        if (window.confirm("Are You Sure To Delete This Record?")) {
            dispatch(deleteSubcategory({ id }));
        }

    }

    const filteredData = data.filter(row =>
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.subCategoryId.toLowerCase().includes(search.toLowerCase())||
        (row.status ? "active" : "inactive").includes(search.toLowerCase())
    );

    const columns = [

        {
            name: "Id",
            selector: row => row.subCategoryId,
            sortable: true
        },

        {
            name: "Name",
            selector: row => row.name,
            sortable: true
        },

        {
            name: "Pic",
            cell: row => (
                <Link
                    to={`${import.meta.env.VITE_APP_IMAGE_SERVER}/subcategory/${row.pic}`}
                    target="_blank"
                >
                    <img
                        src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/subcategory/${row.pic}`}
                        height="60"
                        width="80"
                        alt=""
                    />
                </Link>
            )
        },

        {
            name: "Status",
            selector: row => row.status ? "Active" : "Inactive",
            sortable: true
        },

        {
            name: "Update",
            cell: row => (
                <Link
                    to={`/admin/subcategory/update/${row.id}`}
                    className="btn btn-primary"
                >
                    <i className="bi bi-pencil-square"></i>
                </Link>
            )
        },

        {
            name: "Delete",
            cell: row => (
                <button
                    className="btn btn-danger"
                    onClick={() => deleteRecord(row.id)}
                >
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
                            Subcategory
                            <Link to="/admin/subcategory/create">
                                <i className="bi bi-plus text-light float-end"></i>
                            </Link>
                        </h5>
                        <input
                            type="text"
                            className="form-control mb-3 w-25 float-end"
                            placeholder="Search Subcategory..."
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