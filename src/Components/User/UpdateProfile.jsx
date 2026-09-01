import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import TextValidator from '../../FormValidators/TextValidator'
export default function UpdateProfile({changeSearchParams}) {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: ""

  })

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",

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
    let item = Object.values(errorMessage).find(x => x !== "")
    if (item) {
      setShow(true)
      return
    }

    let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${Cookies.get("token")}`
      },
      body: JSON.stringify({ ...data })
    })
    let result = await response.json()
    if (response.ok) {
      Cookies.set("token", result.token);
      changeSearchParams("Profile")
    }
    else {
      if (result.message === "Username Already Taken") {
        setErrorMessage({ ...errorMessage, username: result.message })
      }
      if (result.message === "Email Address Already Taken") {
        setErrorMessage({ ...errorMessage, email: result.message })
      }
      setShow(true)
    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/profile`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      })
      response = await response.json()
      if (response.status) {
        setData({ ...response.data })
      }
      else {
        navigate("/login")
      }
    })()
  }, [])
  return (
    <form onSubmit={postData}>
      <div className="row">
        <div className="col-lg-6 mb-3">
          <label>Full Name*</label>
          <input type="text" name="name" value={data.name} onChange={getInputData}
            placeholder="Full Name" className={`form-control ${show && errorMessage.name ? "border-danger" : "border-primary"}`} />
          {show && errorMessage.name ? <p className="text-danger">{errorMessage.name}</p> : null}
        </div>

        <div className="col-lg-6 mb-3">
          <label>Phone Number*</label>
          <input type="text" name="phone" value={data.phone} onChange={getInputData}
            placeholder="Phone Number" className={`form-control ${show && errorMessage.phone ? "border-danger" : "border-primary"}`} />
          {show && errorMessage.phone ? <p className="text-danger">{errorMessage.phone}</p> : null}
        </div>

        <div className="col-lg-6 mb-3">
          <label>Username*</label>
          <input type="text" name="username" value={data.username} onChange={getInputData}
            placeholder="Username" className={`form-control ${show && errorMessage.username ? "border-danger" : "border-primary"}`} />
          {show && errorMessage.username ? <p className="text-danger">{errorMessage.username}</p> : null}
        </div>

        <div className="col-lg-6 mb-3">
          <label>Email Address*</label>
          <input type="email" name="email" value={data.email} onChange={getInputData}
            placeholder="Email Address" className={`form-control ${show && errorMessage.email ? "border-danger" : "border-primary"}`} />
          {show && errorMessage.email ? <p className="text-danger">{errorMessage.email}</p> : null}
        </div>

        <div className="col-12 mb-3">
          <button type="submit" className="btn btn-primary w-100">Update Profile</button>
        </div>
      </div>
    </form>
  )
}
