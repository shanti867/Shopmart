import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../Components/Breadcrum'
import ContactDetails from '../Components/ContactDetails'
import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
import TextValidator from '../FormValidators/TextValidator'

const dataOptions = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
}
const errorOptions = {
    name: "Name Field is Mendatory",
    email: "Email Field is Mendatory",
    phone: "Phone Number Field  is Mendatory",
    subject: "Subject Field is Mendatory",
    message: "Message Field is Mendatory"
}

import { createContactUs } from "../Redux/ActionCreators/ContactUsActionCreators"
export default function ContactUsPage() {
    let [data, setData] = useState({...dataOptions})
    let [errorMessage, setErrorMessage] = useState({ ...errorOptions })
    let [show, setShow] = useState(false)
    let [message, setMessage] = useState(false)

    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        map2: import.meta.env.VITE_APP_MAP2,

    })
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: TextValidator(e) })
    }
    function postData(e) {
        e.preventDefault();
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            dispatch(createContactUs({
                ...data,
                date: new Date(),
                status: true
            }))
            setMessage(true)
            setData({ ...dataOptions })
            setErrorMessage({ ...errorMessage })
            setShow(false)
        }

    }
    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                setSettingData(() => {
                    let item = {}
                    Object.keys(settingData).map(key => item[key] = SettingStateData[0][key] || settingData[key])
                    return item
                })
            }
        })()
    }, [SettingStateData.length])
    return (
        <>
            <Breadcrum title='Contact Us' />
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "900px" }}>
                                    <h1 className="text-primary border-bottom border-primary border-2 d-inline-block pb-2">Get in touch</h1>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <h5 className="text-primary wow fadeInUp" data-wow-delay="0.1s">Let’s Connect</h5>
                                <h1 className="display-5 mb-4 wow fadeInUp" data-wow-delay="0.3s">Send Your Message</h1>
                                {message ?
                                    <>
                                        <h4>Thank You For Contacting Us</h4>
                                        <p>Your message has been submitted successfully. We appreciate you reaching out to {settingData.siteName}. Our Support
                                            team has received you inquiry and will review it shortly. We aim to respond within 24-48 hours. Thank
                                            you for your patience, and we look forward to assisting you.
                                        </p>
                                    </> : null}
                                <form onSubmit={postData}>
                                    <div className="row g-4 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="col-lg-12">
                                            <div className="form-floating">
                                                <input type="text" name='name' onChange={getInputData} value={data.name} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} id="name" placeholder="Your Name" />
                                                <label htmlFor="name">Your Name</label>
                                                {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-xl-6">
                                            <div className="form-floating">
                                                <input type="email" name='email' onChange={getInputData} value={data.email} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} id="name" placeholder="Your Name" />
                                                <label htmlFor="name">Your Email Address</label>
                                                {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-xl-6">
                                            <div className="form-floating">
                                                <input type="text" name='phone' onChange={getInputData} value={data.phone} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} id="name" placeholder="Your Name" />
                                                <label htmlFor="name">Your Phone Number</label>
                                                {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" name='subject' onChange={getInputData} value={data.subject} className={`form-control ${show && errorMessage.subject ? 'border-danger' : 'border-primary'}`} id="name" placeholder="Your Name" />
                                                <label htmlFor="name">Subject</label>
                                                {show && errorMessage.subject ? <p className='text-danger'>{errorMessage.subject}</p> : null}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea style={{ height: "200px" }} name='message' onChange={getInputData} value={data.message} className={`form-control ${show && errorMessage.message ? 'border-danger' : 'border-primary'}`} id="name"></textarea>
                                                <label htmlFor="name">Message</label>
                                                {show && errorMessage.message ? <p className='text-danger'>{errorMessage.message}</p> : null}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button type='submit' className="btn btn-primary w-100 py-3">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.2s">
                                <div className="h-100 rounded w-100">
                                    <iframe className="rounded w-100" style={{ height: "100%" }}
                                        src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=A-52, Ducata, Sector 16, Noida&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                                </div>
                            </div>
                            <ContactDetails />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
