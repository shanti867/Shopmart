import React, { useEffect, useState } from 'react'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { getSetting, createSetting, updateSetting } from "../../../Redux/ActionCreators/SettingActionCreators"
import { useDispatch, useSelector } from 'react-redux';

export default function AdminSettingPage() {
    let [data, setData] = useState({
        siteName: "",
        address: "",
        map1: "",
        map2: "",
        email: "",
        phone: "",
        whatsapp: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: "",
        privacyPolicy: "",
        termsAndConditions: "",
        refundPolicy: "",

    })
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    function getInputData(e){
        let{name, value} = e.target 
        setData({...data,[name]:value})
    }
    function postData(e){
        e.preventDefault()
    }
    useEffect(() => {
        dispatch(getSetting());

        if (SettingStateData.length) {
            setData({ ...data, ...SettingStateData[0] })
        }
    }, [SettingStateData.length]);
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light text-center p-2'>Setting</h5>
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label>Address</label>
                                        <input type="text" name="address" onChange={getInputData} placeholder='Address' className='form-control border-primary'/>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label>Map1</label>
                                        <input type="url" name="map1" onChange={getInputData} placeholder='Map1' className='form-control border-primary'/>
                                    </div>

                                     <div className="col-12 mb-3">
                                        <label>Map2</label>
                                        <input type="url" name="map2" onChange={getInputData} placeholder='Map2' className='form-control border-primary'/>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <label>Site Name</label>
                                        <input type="text" name="siteName" onChange={getInputData} placeholder='Site Name' className='form-control border-primary'/>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <label>Email Address</label>
                                        <input type="email" name="email" onChange={getInputData} placeholder='Email Address' className='form-control border-primary'/>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Phone Number</label>
                                        <input type="text" name="phone" onChange={getInputData} placeholder='Phone Number' className='form-control border-primary'/>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Whatsapp Number</label>
                                        <input type="text" name="whatsapp" onChange={getInputData} placeholder='Whatsapp Number' className='form-control border-primary'/>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Facebook Profile Page url</label>
                                        <input type="url" name="facebook" onChange={getInputData} placeholder='Facebook Profile Page url' className='form-control border-primary'/>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Twitter Profile Page url</label>
                                        <input type="url" name="twitter" onChange={getInputData} placeholder='Twitter Profile Page url' className='form-control border-primary'/>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Instagram Profile Page url</label>
                                        <input type="url" name="instagram" onChange={getInputData} placeholder='Instagram Profile Page url' className='form-control border-primary'/>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Linkeding Profile Page url</label>
                                        <input type="url" name="linkeding" onChange={getInputData} placeholder='Linkeding Profile Page url' className='form-control border-primary'/>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Youtube Profile Page url</label>
                                        <input type="url" name="youtube" onChange={getInputData} placeholder='Youtube Profile Page url' className='form-control border-primary'/>
                                    </div>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </>
    )
}
