import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Breadcrum from "../../../Components/Breadcrum";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactUsActionCreators";

export default function AdminContactUsPage() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.ContactUsStateData);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(getContactUs());
    }, []);

    function updateRecord(id) {
        if (window.confirm("Are You Sure to Change Status of This Record?")) {

            let ContactUs = data.find(x => x.id === id);

            if (!ContactUs) {
                return;
            }

            dispatch(updateContactUs({
                id: ContactUs.id,
                status: !ContactUs.status
            }));
        }
    }

    function deleteRecord(id) {
        if (window.confirm("Are You Sure To Delete This Record")) {
            dispatch(deleteContactUs({ id }));
        }
    }

    const filteredData = data.filter(row =>
        row.ContactUsId?.toLowerCase().includes(search.toLowerCase()) ||
        row.name?.toLowerCase().includes(search.toLowerCase()) ||
        (row.status ? "active" : "inactive").includes(search.toLowerCase())
    );

    const columns = [
        {
            name: "Id",
            selector: row => row.contactUsId,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable:true
        },
        {
            name: "Phone",
            selector: row => row.phone,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true
        },
        {
            name: "Subject",
            selector: row => row.subject,
            width:"200px",
            wrap:true,
            sortable:true
        },
        {
            name: "Date",
            selector: row => row.date,
            sortable:true
        },
        {
            name: "Status",
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
        {
            name: "View",
            cell: row=>(
                <Link to={`/admin/contact/show/${row.id}`} className='btn btn-primary'><i className='bi bi-eye'></i></Link>
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
                            ContactUs
                        </h5>

                        <input
                            type="text"
                            className="form-control mb-3 w-25 float-end"
                            placeholder="Search ContactUs..."
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