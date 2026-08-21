import React, { useState } from 'react'
import TextValidator from '../../FormValidators/TextValidator'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
    let [data, setData] = useState({
        name: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        cpassword: '',
        role: "Buyer"
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
    let navigate = useNavigate()
    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: TextValidator(e) })
    }
    async function postData(e) {
        e.preventDefault()

        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...data,
                status: true
            })
        })
        if (response.ok) {
            navigate("/login")
        }
        else {        
        let message = await response.json()
            if(message.message === "Username Already Taken"){
                setErrorMessage({...errorMessage, username: message.message})
            }
            else if(message.message === "Email Address Already Taken"){
                setErrorMessage({...errorMessage, email: message.message})
            }
            else if(message.message === "Password and Confirm Password do not match"){
                setErrorMessage({...errorMessage, cpassword: message.message})
            }
            setShow(true)
        }
    }
    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-xl-8 col-lg-10 m-auto">
                    <h5 className="text-center bg-primary text-light p-2">Create Your Account</h5>
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
                                <label>Password*</label>
                                <input type="password" name="password" onChange={getInputData}
                                    placeholder="Password" className={`form-control ${show && errorMessage.password ? "border-danger" : "border-primary"}`} />
                                {show && errorMessage.password ? <p className="text-danger">{errorMessage.password}</p> : null}
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label>Confirm Password*</label>
                                <input type="password" name="cpassword" onChange={getInputData}
                                    placeholder="Confirm Password" className={`form-control ${show && errorMessage.password ? "border-danger" : "border-primary"}`} />
                            </div>

                            <div className="col-12 mb-3">
                                <button type="submit" className="btn btn-primary w-100">Signup</button>
                            </div>
                        </div>
                    </form>
                    <div>
                        <Link to="/login">Already Have an Account?Login </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

