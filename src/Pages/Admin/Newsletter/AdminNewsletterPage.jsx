import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Breadcrum from "../../../Components/Breadcrum";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getNewsletter, deleteNewsletter, updateNewsletter } from "../../../Redux/ActionCreators/NewsletterActionCreators";

export default function AdminNewsletterPage() {
    let [flag, setFlag] = useState(true)
    const dispatch = useDispatch();
    const data = useSelector(state => state.NewsletterStateData);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(getNewsletter());
    }, []);

    function updateRecord(id) {
        if (window.confirm("Are You Sure to Change Status of This Record?")) {

            let newsletter = data.find(x => x.id === id);

            if (!newsletter) {
                return;
            }

            dispatch(updateNewsletter({
                id: newsletter.id,
                status: !newsletter.status
            }));
        }
    }

    // function updateRecord(id){
    //     if(window.confirm("Are You Sure to Status of That Record")){
    //         let index = data.findIndex(x=> x.id === id)
    //         data[index].status = !data[index].status
    //         updateNewsletter({...data})
    //         setData(data)
    //         setFlag(!flag)
    //     }
    // }

    function deleteRecord(id) {
        if (window.confirm("Are You Sure To Delete This Record")) {
            dispatch(deleteNewsletter({ id }));
        }
    }

    const filteredData = data.filter(row =>
        row.newsletterId?.toLowerCase().includes(search.toLowerCase()) ||
        row.name?.toLowerCase().includes(search.toLowerCase()) ||
        (row.status ? "active" : "inactive").includes(search.toLowerCase())
    );

    const columns = [
        {
            name: "Id",
            selector: row => row.newsletterId,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true
        },

        {
            name: "Status",
            cell: row => (
                <button
                    className={`btn ${row.status ? "btn-success" : "btn-secondary"}`}
                    onClick={() =>{
                         updateRecord(row.id)}}>
                    {row.status ? "Active" : "Inactive"}
                </button>
            ),
            sortable: true
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
                            Newsletter
                        </h5>

                        <input
                            type="text"
                            className="form-control mb-3 w-25 float-end"
                            placeholder="Search Newsletter..."
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