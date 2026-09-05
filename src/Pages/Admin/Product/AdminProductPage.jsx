import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Breadcrum from "../../../Components/Breadcrum";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import {
//     getProduct,
//     deleteProduct
// } from "../../../Redux/ActionCreators/ProductActionCreators";
import {
    getProduct, deleteProduct
} from "../../../Redux/ActionCreators/ProductActionCreators "


export default function AdminProductPage() {

    const dispatch = useDispatch();
    const data = useSelector(state => state.ProductStateData);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(getProduct());
    }, []);

    function deleteRecord(id) {
        if (window.confirm("Are You Sure To Delete This Record?")) {
            dispatch(deleteProduct({ id }));
        }
    }

    const filteredData = data.filter(row =>

        row.name?.toLowerCase().includes(search.toLowerCase()) ||
        row.ProductId?.toLowerCase().includes(search.toLowerCase()) ||
        row.maincategory?.name?.toLowerCase().includes(search.toLowerCase()) ||
        row.subcategory?.name?.toLowerCase().includes(search.toLowerCase()) ||
        row.brand?.name?.toLowerCase().includes(search.toLowerCase()) ||
        (row.status ? "active" : "inactive")
            .includes(search.toLowerCase())
    );

    const columns = [
        {
            name: "Id",
            selector: row => row.ProductId,
            sortable: true
        },


        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
            wrap: true
        
        },


        {
            name: "Maincategory",
            selector: row => row.maincategory?.name,
            sortable: true
        },


        {
            name: "Subcategory",
            selector: row => row.subcategory?.name,
            sortable: true
        },


        {
            name: "Brand",
            selector: row => row.brand?.name,
            sortable: true
        },


        {
            name: "Color",
            selector: row => row.color?.join(", "),
            wrap:true
        },


        {
            name: "Size",
            selector: row => row.size?.join(", "),
            wrap:true
        },


        {
            name: "Base Price",
            selector: row => `₹${row.basePrice}`,
            sortable: true
        },


        {
            name: "Discount",
            selector: row => row.discount,
            sortable: true
        },


        {
            name: "Final Price",
            selector: row => `₹${row.finalPrice}`,
            sortable: true
        },


        {
            name: "Stock",
            selector: row => row.stock ? "In Stock" : "Out Of Stock"
        },


        {
            name: "Stock Quantity",
            selector: row => row.stockQuantity,
            sortable: true
        },


        {
            name: "Pic",
            width: "400px",
            cell: row => (
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px"
                }}>

                    {
                        row.pic?.map((p, index) => (

                            <Link
                                key={index}
                                to={`${import.meta.env.VITE_APP_IMAGE_SERVER}/product/${p}`}
                                target="_blank"
                            >

                                <img
                                    src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/product/${p}`}
                                    className="m-1"
                                    height="60"
                                    width="80"
                                    alt=""
                                />

                            </Link>

                        ))
                    }

                </div>

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
                    to={`/admin/product/update/${row.id}`}
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
                            Product
                            <Link to="/admin/product/create">
                                <i className="bi bi-plus text-light float-end"></i>
                            </Link>
                        </h5>

                        <input
                            type="text"
                            className="form-control mb-3 w-25 float-end"
                            placeholder="Search Product..."
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