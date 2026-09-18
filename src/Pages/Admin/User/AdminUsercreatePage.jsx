import React, { useEffect, useState } from 'react'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import TextValidator from '../../../FormValidators/TextValidator'

import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUser } from '../../../Redux/ActionCreators/UserActionCreators'
export default function AdminUsercreatePage() {
    let [data, setData] = useState({
        name: "",
        icon: "",
        shortDescription: "",
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        icon: "Icon Field is Mendatory",
        shortDescription: "Short Description Field is Mendatory"
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

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x != "")
        if (error) {
            setShow(true)
        }
        else {
            try {
                let item = UserStateData.find(x => x.name?.toLocaleLowerCase() === data.name?.toLocaleLowerCase())
                if (item) {
                    setErrorMessage({ ...errorMessage, name: 'User With This Name Already Exist' })
                    setShow(true)
                    return
                }
                dispatch(createUser(data))
                // navigate("/admin/User")
                setTimeout(()=>{
                   navigate("/admin/user") 
                }, 500)
            }
            catch (error) {
                console.log(error);
            }
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
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} placeholder='User Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-12 mb-3 ">
                                    <label>Short Description*</label>
                                    <textarea name="shortDescription" rows = {3} onChange={getInputData} placeholder='User Name' className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.shortDescription ? <p className='text-danger text-capitalize'>{errorMessage.shortDescription}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Icon*</label>
                                    <input type="text" name="icon" onChange={getInputData} className={`form-control ${show && errorMessage.icon ? 'border-danger' : 'border-primary'}`} placeholder="Bootstrap Icon Tag like <i class='bi bi-list'></i>"/>
                                    {show && errorMessage.icon ? <p className='text-danger text-capitalize'>{errorMessage.icon}</p> : null}
                                </div>

                                <div className="col-md-6 md-3">
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