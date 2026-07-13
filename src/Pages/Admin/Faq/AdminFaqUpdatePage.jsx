import React, { useEffect, useState } from 'react'
import axios from "axios"
import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextValidator from '../../../FormValidators/TextValidator'


import { useDispatch, useSelector } from 'react-redux';
import { getFaq, updateFaq } from "../../../Redux/ActionCreators/FaqActionCreators"

export default function AdminFaqUpdatePage() {
    let { id } = useParams()

    let [data, setData] = useState({
        name: "",
        icon: "",
        shortDescription:"",
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        icon: "",
        shortDescription:""
    })
    let [show, setShow] = useState(false)
    let FaqStateData = useSelector(state => state.FaqStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    function getInputData(e) {

        let name = e.target.name;
        let value;
        if (name === "status") {
            value = e.target.value === "1"
        }
        else {
            value = e.target.value;
        }

        setData({ ...data, [name]: value });

        setErrorMessage({
            ...errorMessage,
            [name]: TextValidator(e)
        });
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x != "")
        if (error) {
            setShow(true)
        }
        else {
            try {
                let item = FaqStateData.find(x => x.id != id && x.name?.toLocaleLowerCase() === data.name?.toLocaleLowerCase())
                if (item) {
                    setErrorMessage({ ...errorMessage, name: 'Faq With This Name Already Exist' })
                    setShow(true)
                    return
                }
                dispatch(updateFaq(id, data))
                // navigate("/admin/Faq")

                setTimeout(() => {
                    navigate("/admin/faq");
                }, 500);
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getFaq())
            if (FaqStateData.length) {
                let item = FaqStateData.find(x => x.id == id)
                if (item) {
                    setData({ ...data, ...item })
                }
                else {
                    navigate("/admin/faq")
                }
            }

        })()
    }, [FaqStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light text-center p-2'>Update Faq<Link to="/admin/faq"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Faq Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Short Description*</label>
                                    <textarea name="shortDescription" value ={data.shortDescription} rows = {3} onChange={getInputData} placeholder='Faq Name' className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.shortDescription ? <p className='text-danger text-capitalize'>{errorMessage.shortDescription}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Icon*</label>
                                    <input type="text" name="icon" value={data.icon} onChange={getInputData} className={`form-control ${show && errorMessage.icon ? 'border-danger' : 'border-primary'}`} placeholder="Bootstrap Icon Tag like <i class='bi bi-list'></i>"/>
                                    {show && errorMessage.icon ? <p className='text-danger text-capitalize'>{errorMessage.icon}</p> : null}
                                </div>

                                <div className="col-md-6 md-3">
                                    <label>Status*</label>
                                    <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button type='submit' className='btn btn-primary w-100'>Update</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
