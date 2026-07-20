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
    let [termsAndConditions, setTermsAndConditions] = useState("")
    let [refundPolicy, setRefundPolicy] = useState("")
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

    })
    function changePrivacyPolicy(documentModel, nextHtml) {
        setPrivacyPolicy(nextHtml !== undefined ? nextHtml : renderHTML(documentModel))
    }
    function changeTermsAndConditions(documentModel, nextHtml) {
        setTermsAndConditions(nextHtml !== undefined ? nextHtml : renderHTML(documentModel))
    }
    function changeRefundPolicy(documentModel, nextHtml) {
        setRefundPolicy(nextHtml !== undefined ? nextHtml : renderHTML(documentModel))
    }
    function handleChangePrivacyPolicy(nextHtml, editor) {
        changePrivacyPolicy(editor.getJSON(), nextHtml)
    }
    function handleChangeTermsAndConditions(nextHtml, editor) {
        changeTermsAndConditions(editor.getJSON(), nextHtml)
    }
    function handleChangeRefundPolicy(nextHtml, editor) {
        changeRefundPolicy(editor.getJSON(), nextHtml);
    }
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    function postData(e) {
        e.preventDefault()
        console.log("Submit button clicked");

        let item = {
            ...data,
            privacyPolicy: privacyPolicy,
            termsAndConditions: termsAndConditions,
            refundPolicy: refundPolicy
        }
        console.log("Item =", item);
        if (SettingStateData.length) {
            dispatch(updateSetting(SettingStateData[0].id,item))
        }
        else {
            dispatch(createSetting(item))
            
        }
        toast("Your Record Has Been Updated!!!");
    }

    useEffect(() => {
        dispatch(getSetting());
        (() => {
            if (SettingStateData.length) {
                setData({ ...data, ...SettingStateData[0] })

                setTimeout(() => {
                    const documentModel1 = createStructuredContent(SettingStateData[0].privacyPolicy ?? "")
                    const documentModel2 = createStructuredContent(SettingStateData[0].termsAndConditions ?? "")
                    const documentModel3 = createStructuredContent(SettingStateData[0].refundPolicy ?? "")
                    changePrivacyPolicy(documentModel1, SettingStateData[0].privacyPolicy ?? "")
                    changeTermsAndConditions(documentModel2, SettingStateData[0].termsAndConditions ?? "")
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
                                    <input type="text" name="address" value={data.address?? ""} onChange={getInputData} placeholder='Address' className='form-control border-primary' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Map1</label>
                                    <input type="url" name="map1" value={data.map1?? ""} onChange={getInputData} placeholder='Map1' className='form-control border-primary' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Map2</label>
                                    <input type="url" name="map2" value={data.map2?? ""} onChange={getInputData} placeholder='Map2' className='form-control border-primary' />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Site Name</label>
                                    <input type="text" name="siteName" value={data.siteName?? ""} onChange={getInputData} placeholder='Site Name' className='form-control border-primary' />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={data.email?? ""} onChange={getInputData} placeholder='Email Address' className='form-control border-primary' />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Phone Number</label>
                                    <input type="text" name="phone" value={data.phone?? ""} onChange={getInputData} placeholder='Phone Number' className='form-control border-primary' />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Whatsapp Number</label>
                                    <input type="text" name="whatsapp" value={data.whatsapp?? ""} onChange={getInputData} placeholder='Whatsapp Number' className='form-control border-primary' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Facebook Profile Page url</label>
                                    <input type="url" name="facebook" value={data.facebook?? ""} onChange={getInputData} placeholder='Facebook Profile Page url' className='form-control border-primary' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Twitter Profile Page url</label>
                                    <input type="url" name="twitter" value={data.twitter?? ""} onChange={getInputData} placeholder='Twitter Profile Page url' className='form-control border-primary' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Instagram Profile Page url</label>
                                    <input type="url" name="instagram" value={data.instagram?? ""} onChange={getInputData} placeholder='Instagram Profile Page url' className='form-control border-primary' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Linkedin Profile Page url</label>
                                    <input type="url" name="linkedin" value={data.linkedin?? ""} onChange={getInputData} placeholder='Linkedin Profile Page url' className='form-control border-primary' />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Youtube Profile Page url</label>
                                    <input type="url" name="youtube" value={data.youtube?? ""} onChange={getInputData} placeholder='Youtube Profile Page url' className='form-control border-primary' />
                                </div>


                                <div className="col-12 mb-3">
                                    <label>Privacy Policy</label>
                                    <RichTextEditor
                                        ref={editorRefPrivacyPolicy}
                                        onChange={handleChangePrivacyPolicy}
                                        value={privacyPolicy?? ""}
                                    />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Terms And Conditons</label>
                                    <RichTextEditor
                                        ref={editorRefTermsAndConditions}
                                        onChange={handleChangeTermsAndConditions}
                                        value={termsAndConditions?? ""}
                                    />
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Refund Policy</label>
                                    <RichTextEditor
                                        ref={editorRefRefundPolicy}
                                        onChange={handleChangeRefundPolicy}
                                        value={refundPolicy?? ""}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
