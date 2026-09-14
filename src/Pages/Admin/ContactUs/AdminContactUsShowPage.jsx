import React, { useEffect, useState } from "react";

import Breadcrum from "../../../Components/Breadcrum";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactUsActionCreators";
export default function AdminContactUsShowPage() {
    let {id} = useParams()
    let navigate = useNavigate()
    const dispatch = useDispatch();
    let [data, setData] = useState({})
    let ContactUsStateData = useSelector(state => state.ContactUsStateData);

    useEffect(() => {
    dispatch(getContactUs());
}, [dispatch]);

    

    function deleteRecord() {
        if (window.confirm("Are You Sure To Delete This Record")) {
            dispatch(deleteContactUs({ id }));
            navigate("/admin/contact")
        }
    }

    useEffect(() => {
    if (ContactUsStateData.length > 0) {
        let item = ContactUsStateData.find(
            x => String(x.id) === String(id)
        );
        if (item) {
            setData(item);
        }
        else {
            navigate("/admin/contact");
        }
    }
}, [ContactUsStateData, id, navigate]);

   function updateRecord() {
        if (window.confirm("Are You Sure to Change Status of This Record?")) {
            // let ContactUs = data.find(x => String(x.id) === String(id));
            // if (!ContactUs) {
            //     return;
            // }
            dispatch(updateContactUs({
                id: data.id,
                status: !data.status
            }));
        }
    }
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
                            ContactUs Query <Link to="/admin/contact"><i className='bi bi-arrow-left float-end text-light'></i></Link>
                        </h5>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.contactUsId}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone Number</th>
                                        <td>{data.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Email Address</th>
                                        <td>{data.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Subject</th>
                                        <td>{data.subject}</td>
                                    </tr>
                                    <tr>
                                        <th>message</th>
                                        <td>{data.message}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>{data.status?"Active":"Inactive"}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {data.status?
                                            <button onClick={updateRecord} className='btn btn-primary w-100'>Update Status</button>:
                                            <button onClick={deleteRecord} className='btn btn-danger w-100'>Delete</button>}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}