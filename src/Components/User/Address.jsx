import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'

const inputOptions = {
  name: "",
  email: "",
  phone: "",
  address: "",
  pin: "",
  city: "",
  state: "",
}
export default function Address() {
  let [showModal, setShowModal] = useState(false)
  let [option, setOption] = useState({})
  let [flag, setFlag] = useState(false)
  let [inputData, setInputData] = useState({ ...inputOptions })

  let [data, setData] = useState({ address: [] })
  let navigate = useNavigate()

  function create() {
    setShowModal(true)
    setOption({
      type: "Create"
    })
    setInputData({ ...inputOptions })
  }

  function update(id){
    let item = data.address.find(item => item.id === id)
    setShowModal(true)
    setOption({
      type: "Update",
      id: id
    })
    setInputData({...item})
  }
  function getInputData(e) {
    let { name, value } = e.target
    setInputData({ ...inputData, [name]: value })
  }

  async function deleteRecord(id) {
    if (window.confirm("Are You Sure You Want To Delete That Record")){
    //   data.address.splice(index, 1)
    // setData(data)

    let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/address/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${Cookies.get("token")}`
      },
    })
    response = await response.json()

    if (response.status) {
      setData({
        ...data,
        address: data.address.filter(item => item.id !== id)
      })
    }
    else {
      console.log(response.message)
    }
  }
  }

  async function postData(e) {
    e.preventDefault()
    let url = `${import.meta.env.VITE_APP_BACKEND_SERVER}/user/address`
    let method = "POST"
    if(option.type === "Update"){
      url = `${import.meta.env.VITE_APP_BACKEND_SERVER}/user/address/${option.id}`
      method = "PUT"
    }
    let response = await fetch(url,{
      method: method,
      headers:{
        "content-type": "application/json",
        "Authorization":`Bearer ${Cookies.get("token")}`
      },
      body: JSON.stringify(inputData)
    })
    response = await response.json()
    if (response.status) {
      if(option.type === "Create"){
        setData({
        ...data,
        address: [...data.address, response.data]
      })
      }
      else{
        setData({
          ...data,
          address: data.address.map(item => 
            item.id === option.id 
            ? response.data :item
          )
        })
      }
      setShowModal(false)
      setInputData({...inputOptions})
    }
    else {
      console.log(response.message);
    }

  }

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/address`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      })
      response = await response.json()
      if (response.status) {
        setData({
          address: response.data
        })
      }
      else {
        navigate("/login")
      }
    })()
  }, [])
  return (
    <>
      <div>
        <div className="float-end">
          <button className="btn btn-primary" onClick={create}>Add New Address</button>
        </div>

        <div>
          {data.address?.map((item, index) => {
            return <div className='card p-3 w-75' key={index}>
              <p>{item.name}</p>
              <p>{item.email},{item.phone}</p>
              <p>{item.address}</p>
              <p>{item.pin},{item.city},{item.state}</p>
              <div className='btn-group position-absolute end-0'>
                <button className='btn btn-primary' onClick={()=>update(item.id)}><i className='bi bi-pencil'></i></button>
                <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-x'></i></button>
              </div>
            </div>
          })}
        </div>

        <div className={`modal fade ${showModal ? "show d-block" : ""}`} id="exampleModal">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{option.type}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={postData}>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label>Name*</label>
                      <input type="text" name="name" value={inputData.name} onChange={getInputData} required placeholder='Full Name' className="form-control border-primary" />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Email*</label>
                      <input type="email" name="email" value={inputData.email} onChange={getInputData} required placeholder='Email Address' className="form-control border-primary" />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Phone Number*</label>
                      <input type="text" name="phone" value={inputData.phone} onChange={getInputData} required placeholder='Phone Number' className="form-control border-primary" />
                    </div>

                    <div className="col-12 mb-3">
                      <label>Address*</label>
                      <textarea name="address" value={inputData.address} onChange={getInputData} required placeholder='Address' className="form-control border-primary" />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Pin*</label>
                      <input type="pin" name="pin" value={inputData.pin} onChange={getInputData} required placeholder='Pin Code' className="form-control border-primary" />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>City Name*</label>
                      <input type="text" name="city" value={inputData.city} onChange={getInputData} required placeholder='City Name' className="form-control border-primary" />
                    </div>

                    <div className="col-12 mb-3">
                      <label>State*</label>
                      <input type="text" name="state" value={inputData.state} onChange={getInputData} required placeholder='State Name' className="form-control border-primary" />
                    </div>

                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary w-100">{option.type}</button>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
