import React, { useEffect, useRef, useState } from 'react'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { getSetting, createSetting, updateSetting } from "../../../Redux/ActionCreators/SettingActionCreators"
import { useDispatch, useSelector } from 'react-redux';

import RichTextEditor from '../../../rte/RichTextEditor'
import { createStructuredContent, renderHTML } from '../../../rte/richTextEditorBridge';

import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
export default function AdminSettingPage() {
    let editorRefPrivacyPolicy = useRef(null)
    let editorRefTermsAndConditions = useRef(null)
    let editorRefRefundPolicy = useRef(null)
    let [privacyPolicy, setPrivacyPolicy] = useState("")
    let[termsAndCondtions, setTermsAndConditions] = useState("")
    let[refundPolicy, setRefundPolicy] = useState("")
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
        // privacyPolicy: "",
        // termsAndConditions: "",
        // refundPolicy: "",

    })
    function changePrivacyPolicy(documentModel, nextHtml){
        setPrivacyPolicy(nextHtml !== undefined ? nextHtml : renderHTML(documentModel))
    }
    function changeTermsAndCondtions(documentModel, nextHtml){
        setTermsAndConditions(nextHTml !== undefined ? nextHtml:renderHTML(documentModel))
    }
    function changeRefundPolicy(documentModel, nextHtml){
        setRefundPolicy(nextHtml !== undefined ? nextHtml : renderHTML(documentModel))
    }
    function handleChangePrivacyPolicy(nextHtml, editor){
        changePrivacyPolicy(editor.getJSON(), nextHtml)
    }
    function handleChangeTermsAndConditions(nextHtml, editor){
        changeTermsAndCondtions(editor.getJSON(), nextHtml)
    }
    function handleChangeRefundPolicy(nextHtml, editor){
        changeRefundPolicy(editor.getJSON(), nextHtml);
    }
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    function getInputData(e){
        let{name, value} = e.target 
        setData({...data,[name]:value})
    }
    function postData(e){
        e.preventDefault()
        let item = {
            ...data, 
            privacyPolicy : privacyPolicy,
            termsAndCondtions : termsAndCondtions,
            refundPolicy : refundPolicy
        }
        if(SettingStateData.length){
            dispatch(updateSetting(item))
        }
        else{
            dispatch(createSetting(item))
            toast("Your Record Has Been Updated!!!");
    }
        }
    
    useEffect(() => {
        dispatch(getSetting());
        (()=>{
            if (SettingStateData.length) {
            setData({ ...data, ...SettingStateData[0] })

            setTimeout(()=>{
                const documentModel1 = createStructuredContent(SettingStateData[0].privacyPolicy ?? "")
                const documentModel2 = createStructuredContent(SettingStateData[0].termsAndCondtions ?? "")
                const documentModel3 = createStructuredContent(SettingStateData[0].refundPolicy ?? "")
                changePrivacyPolicy(documentModel1, SettingStateData[0].privacyPolicy ?? "")
                changeTermsAndCondtions(documentModel2, SettingStateData[0].termsAndCondtions ?? "")
                changeRefundPolicy(documentModel3, SettingStateData[0].refundPolicy ?? "")
            }, 500)
        }
        })()
    }, [SettingStateData.length]);
    return (
        <>
        <ToastContainer />
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light text-center p-2'>Setting
                            <Link to="/admin/setting/create"><i className="bi bi-plus text-light float-end"></i></Link></h5>
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
                                        <label>Linkedin Profile Page url</label>
                                        <input type="url" name="linkedin" onChange={getInputData} placeholder='Linkedin Profile Page url' className='form-control border-primary'/>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label>Youtube Profile Page url</label>
                                        <input type="url" name="youtube" onChange={getInputData} placeholder='Youtube Profile Page url' className='form-control border-primary'/>
                                    </div>


                                    <div className="col-12 mb-3">
                                        <label>Privacy Policy</label>
                                        <RichTextEditor
                                        ref={editorRefPrivacyPolicy}
                                        onChange={handleChangePrivacyPolicy}
                                        value = {privacyPolicy}
                                        />
                                     </div>

                                     <div className="col-12 mb-3">
                                        <label>Terms And Conditons</label>
                                        <RichTextEditor
                                        ref={editorRefTermsAndConditions}
                                        onChange={handleChangeTermsAndConditions}
                                        value = {termsAndCondtions}
                                        />
                                     </div>

                                     <div className="col-12 mb-3">
                                        <label>Refund Policy</label>
                                        <RichTextEditor
                                        ref={editorRefRefundPolicy}
                                        onChange={handleChangeRefundPolicy}
                                        value = {refundPolicy}
                                        />
                                     </div>
                                     
                                     <button type = "submit" className = "btn btn-primary w-100">Submit</button>
                                </div>
                                
                            </form>
                    </div>
                </div>
            </div>
        </>
    )
}
