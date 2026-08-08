import React,{useEffect,useState} from "react";
import DataTable from "react-data-table-component";
import Breadcrum from "../../../Components/Breadcrum";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";

import {getFaq,deleteFaq} from "../../../Redux/ActionCreators/FaqActionCreators";

export default function AdminFaqPage(){

    const dispatch=useDispatch();
    const data=useSelector(state=>state.FaqStateData);
    const [search,setSearch]=useState("");

    useEffect(()=>{
        dispatch(getFaq());
    },[]);

    function deleteRecord(id){
        if(window.confirm("Are You Sure To Delete This Record")){
            dispatch(deleteFaq({id}));
        }
    }

    const filteredData=data.filter(row=>
        row.faqId?.toLowerCase().includes(search.toLowerCase()) ||
        row.question?.toLowerCase().includes(search.toLowerCase()) ||
        row.answer?.toLowerCase().includes(search.toLowerCase()) ||
        (row.status?"active":"inactive").includes(search.toLowerCase())
    );

    const columns=[
        {
            name:"Id",
            selector:row=>row.faqId,
            sortable:true
        },
        {
            name:"Question",
            selector:row=>row.question,
            sortable:true,
            width:"300px",
            wrap:true
        },
        {
            name:"Answer",
            selector:row=>row.answer,
            sortable:true,
            width:"500px",
            wrap:true,
            style:{
                paddingTop:"10px",
                paddingBottom:"10px"
            }
        },
        {
            name:"Status",
            selector:row=>row.status?"Active":"Inactive",
            sortable:true
        },
        {
            name:"Update",
            cell:row=>(
                <Link to={`/admin/faq/update/${row.id}`} className="btn btn-primary">
                    <i className="bi bi-pencil-square"></i>
                </Link>
            )
        },
        {
            name:"Delete",
            cell:row=>(
                <button className="btn btn-danger" onClick={()=>deleteRecord(row.id)}>
                    <i className="bi bi-x"></i>
                </button>
            )
        }
    ];

    return(
        <>
            <Breadcrum title="Admin"/>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar/>
                    </div>
                    <div className="col-md-9">
                        <h5 className="bg-primary text-light text-center p-2">
                            Faq
                            <Link to="/admin/faq/create">
                                <i className="bi bi-plus text-light float-end"></i>
                            </Link>
                        </h5>

                        <input
                            type="text"
                            className="form-control mb-3 w-25 float-end"
                            placeholder="Search Faq..."
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
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