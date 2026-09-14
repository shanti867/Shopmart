import React, { useEffect, useState } from "react";

import Breadcrum from "../../../Components/Breadcrum";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { getCheckout, deleteCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators";
export default function AdminCheckoutShowPage() {
    let { id } = useParams()
    let navigate = useNavigate()
    const dispatch = useDispatch();
    let [data, setData] = useState({})
    let CheckoutStateData = useSelector(state => state.CheckoutStateData);

    useEffect(() => {
        dispatch(getCheckout());
    }, [dispatch]);



    function deleteRecord() {
        if (window.confirm("Are You Sure To Delete This Record")) {
            dispatch(deleteCheckout({ id }));
            navigate("/admin/checkout")
        }
    }

    useEffect(() => {
        if (CheckoutStateData.length > 0) {
            let item = CheckoutStateData.find(
                x => String(x.id) === String(id)
            );
            if (item) {
                setData(item);
            }
            else {
                navigate("/admin/checkout");
            }
        }
    }, [CheckoutStateData, id, navigate]);

    function updateRecord() {
        if (window.confirm("Are You Sure to Change Status of This Record?")) {
            // let Checkout = data.find(x => String(x.id) === String(id));
            // if (!Checkout) {
            //     return;
            // }
            dispatch(updateCheckout({
                id: data.id,
                status: !data.status
            }));
        }
    }
    let address = {};

    if (data.deliveryAddress) {
        try {
            address = JSON.parse(data.deliveryAddress);
        } catch (error) {
            console.log("Invalid delivery address:", error);
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
                            Checkout Query <Link to="/admin/checkout"><i className='bi bi-arrow-left float-end text-light'></i></Link>
                        </h5>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.checkoutId}</td>
                                    </tr>
                                    <tr>
                                        <th>Delivery Address</th>
                                        <td>
                                            <h5>{address?.name}</h5>
                                            <h6>{address?.phone},{address?.email}</h6>
                                            <p>{address?.address}</p>
                                            <p>{address?.pin},{address?.city},{address?.state}</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Order status</th>
                                        <td>{data.orderStatus}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{data.paymentMode}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status</th>
                                        <td>{data.paymentStatus}</td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{data.subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{data.shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>RPPID</th>
                                        <td>{data.rppid ? data.rppid : "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {data.orderStatus !== "Delivered" || data.paymentStatus === "Pending" ?
                                                <button onClick={updateRecord} className='btn btn-primary w-100'>Update Status</button>
                                                : null}
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