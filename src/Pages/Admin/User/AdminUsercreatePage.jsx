import React, { useEffect, useState } from 'react'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import TextValidator from '../../../FormValidators/TextValidator'

import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUser } from '../../../Redux/ActionCreators/UserActionCreators'
export default function AdminUsercreatePage() {
    let [data, setData] = useState({
        name: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        cpassword: '',
        role: "Admin"
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Full Name Field is Mendatory",
        username: "User Name Field is Mendatory",
        email: "Email Address Field is Mendatory",
        phone: "Phone Number Field is Mendatory",
        password: "password Field is Mendatory",
        cpassword: "Confirm Password Field is Mendatory"

    })
    let [show, setShow] = useState(false)

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
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            navigate("/admin/user")
        }
        else {
            let message = await response.json()
            if (message.message === "Username Already Taken") {
                setErrorMessage({ ...errorMessage, username: message.message })
            }
            if (message.message === "Email Address Already Taken") {
                setErrorMessage({ ...errorMessage, email: message.message })
            }
            if (message.message === "Password and Confirm Password do not match") {
                setErrorMessage({ ...errorMessage, cpassword: message.message })
            }
            setShow(true)
        }

    }

    useEffect(() => {
        dispatch(getUser())
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
                        <h5 className='bg-primary text-light text-center p-2'>Create User<Link to="/admin/user"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <label>Full Name*</label>
                                    <input type="text" name="name" onChange={getInputData}
                                        placeholder="Full Name" className={`form-control ${show && errorMessage.name ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.name ? <p className="text-danger">{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Phone Number*</label>
                                    <input type="text" name="phone" onChange={getInputData}
                                        placeholder="Phone Number" className={`form-control ${show && errorMessage.phone ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.phone ? <p className="text-danger">{errorMessage.phone}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Username*</label>
                                    <input type="text" name="username" onChange={getInputData}
                                        placeholder="Username" className={`form-control ${show && errorMessage.username ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.username ? <p className="text-danger">{errorMessage.username}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Email Address*</label>
                                    <input type="email" name="email" onChange={getInputData}
                                        placeholder="Email Address" className={`form-control ${show && errorMessage.email ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.email ? <p className="text-danger">{errorMessage.email}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="d-block">Password*</label>
                                    <div className="btn-group w-100">
                                        <input type="password" name="password" onChange={getInputData}
                                            placeholder="Password" className={`form-control ${show && errorMessage.password ? "border-danger" : "border-primary"}`} />
                                        {/* <button type="button" className="btn border border-primary" onClick={() => setShowPassword(!showPassword)}><i className={`${showPassword ? "bi bi-eye-slash" : "bi bi-eye"}`}></i></button> */}
                                    </div>
                                    {show && errorMessage.password ? errorMessage.password?.split("|").map((item, index) => {
                                        return <p className="text-danger" key={index}>{item}</p>
                                    }) : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Confirm Password*</label>
                                    <input type="password" name="cpassword" onChange={getInputData}
                                        placeholder="Confirm Password" className={`form-control ${show && errorMessage.cpassword ? "border-danger" : "border-primary"}`} />
                                    {show && errorMessage.cpassword ? <p className="text-danger">{errorMessage.cpassword}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Role*</label>
                                    <select name="role" onChange={getInputData} className='form-select border-primary'>
                                        <option value="Admin">Admin</option>
                                        <option value="Super Admin">Super Admin</option>
                                    </select>
                                </div>


                                <div className="col-md-6 mb-3">
                                    <label>Status*</label>
                                    <select name="status" onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button type='submit' className='btn btn-primary w-100'>Create</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}