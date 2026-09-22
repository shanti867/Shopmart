import React, { useEffect, useState } from 'react'
import axios from "axios"
import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextValidator from '../../../FormValidators/TextValidator'


import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from "../../../Redux/ActionCreators/UserActionCreators"

export default function AdminUserUpdatePage() {
    let { id } = useParams()

    let [data, setData] = useState({
        name: '',
        username: '',
        phone: '',
        email: '',
        role: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",

    })
    let [show, setShow] = useState(false)
    let [isUpdating, setIsUpdating] = useState(false)
    let UserStateData = useSelector(state => state.UserStateData)
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

    async function postData(e) {
        e.preventDefault()
        let item = Object.values(errorMessage).find(x => x !== "")
        if (item) {
            setShow(true)
            return
        }
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let message = await response.json()

        if (message.status === true) {
            navigate("/admin/user")
        }
        else {
            // let message = await response.json()
            if (message.message === "Username Already Taken") {
                setErrorMessage({ ...errorMessage, username: message.message })
            }
            if (message.message === "Email Already Taken") {
                setErrorMessage({ ...errorMessage, email: message.message })
            }
            setShow(true)
        }
    }
    useEffect(() => {
        if (isUpdating) {
            let updateItem = UserStateData.find(item => item.id == id)
            if (updateItem) {
                navigate("/admin/user")
            }
        }
    }, [UserStateData])

    useEffect(() => {
        (() => {
            dispatch(getUser())
            if (UserStateData.length) {
                let item = UserStateData.find(x => x.id == id)
                if (item) {
                    setData({ ...data, ...item })
                }
                else {
                    navigate("/admin/user")
                }
            }

        })()
    }, [UserStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light text-center p-2'>Update User<Link to="/admin/user"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <label>Full Name*</label>
                                    <input type="text" value={data.name} name="name" onChange={getInputData}
                                        placeholder="Full Name" className={`form-control ${show && errorMessage.name ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.name ? <p className="text-danger">{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Phone Number*</label>
                                    <input type="text" value={data.phone} name="phone" onChange={getInputData}
                                        placeholder="Phone Number" className={`form-control ${show && errorMessage.phone ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.phone ? <p className="text-danger">{errorMessage.phone}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Username*</label>
                                    <input type="text" value={data.username} name="username" onChange={getInputData}
                                        placeholder="Username" className={`form-control ${show && errorMessage.username ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.username ? <p className="text-danger">{errorMessage.username}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Email Address*</label>
                                    <input type="email" value={data.email} name="email" onChange={getInputData}
                                        placeholder="Email Address" className={`form-control ${show && errorMessage.email ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.email ? <p className="text-danger">{errorMessage.email}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Role*</label>
                                    <select name="role" value={data.role} onChange={getInputData} className='form-select border-primary'>
                                        <option value="Admin">Admin</option>
                                        <option value="Super Admin">Super Admin</option>
                                    </select>
                                </div>

                                <div className="col-md-6 md-3">
                                    <label>Status*</label>
                                    <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button type='submit' className='btn btn-primary w-100' disabled={isUpdating}>{isUpdating ? "Updating..." : "Update"}</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}