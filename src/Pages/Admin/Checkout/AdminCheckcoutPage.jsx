import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Breadcrum from "../../../Components/Breadcrum";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { getCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators";
export default function AdminCheckoutPage() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.CheckoutStateData);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(getCheckout());
    }, []);

    function updateRecord(id) {
        if (window.confirm("Are You Sure to Change Status of This Record?")) {

            let Checkout = data.find(x => x.id === id);

            if (!Checkout) {
                return;
            }

            dispatch(updateCheckout({
                id: Checkout.id,
                status: !Checkout.status
            }));
        }
    }

    // function deleteRecord(id) {
    //     if (window.confirm("Are You Sure To Delete This Record")) {
    //         dispatch(deleteCheckout({ id }));
    //     }
    // }

    const filteredData = data.filter(row =>
    row.checkoutId?.toLowerCase().includes(search.toLowerCase()) ||
    row.orderStatus?.toLowerCase().includes(search.toLowerCase()) ||
    row.paymentMode?.toLowerCase().includes(search.toLowerCase()) ||
    row.paymentStatus?.toLowerCase().includes(search.toLowerCase())
);
    const columns = [
        {
            name: "Id",
            selector: row => row.checkoutId,
            sortable: true
        },
        
        {
            name: "User",
            selector: row => {
                let address = {};

                if (row.deliveryAddress) {
                    try {
                        address = JSON.parse(row.deliveryAddress);
                    } catch (error) {
                        console.log("Invalid delivery address:", error);
                    }
                }
                return `${address.name || ""}, ${address.city || ""}`;
            },
            width: "200px",
            sortable: true
        },
        {
            name: "Status",
            selector: row => row.orderStatus,
            sortable: true,
            width: "200px",
        },
        {
            name: "Payment Mode",
            selector: row => row.paymentMode,
            sortable: true,
            width: "200px"
        },
        {
            name: "Payment Status",
            selector: row => row.paymentStatus,
            width: "300px",
            sortable: true
        },
        {
            name: "Total",
            selector: row => `\u20B9${row.total}`,
            sortable: true
        },
        {
            name: "Date",
            selector: row => new Date(row.date).toLocaleDateString(),
            sortable: true
        },
        {
            name: "View",
            cell: row => (
                <Link to={`/admin/checkout/show/${row.id}`} className='btn btn-primary'><i className='bi bi-eye'></i></Link>
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
                            Checkout
                        </h5>

                        <input
                            type="text"
                            className="form-control mb-3 w-25 float-end"
                            placeholder="Search Checkout..."
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