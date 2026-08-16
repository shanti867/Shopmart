import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
import { useDispatch, useSelector } from 'react-redux'

export default function About() {
  let [settingData, setSettingData] = useState({
    siteName: import.meta.env.VITE_APP_SITE_NAME,
    facebook: import.meta.env.VITE_APP_FACEBOOK,
    twitter: import.meta.env.VITE_APP_TWITTER,
    youtube: import.meta.env.VITE_APP_YOUTUBE,
    linkedin: import.meta.env.VITE_APP_LINKEDIN,
    instagram: import.meta.env.VITE_APP_INSTAGRAM
  })
  let SettingStateData = useSelector(state => state.SettingStateData)
  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let ActiveMaincategoryStateData = MaincategoryStateData.activeMaincategory
  let dispatch = useDispatch()

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
      <div className="container my-4 py-5">
        <h1>Your Trusted Destination for Quality Products and Seamless Online Shopping</h1>
        <div className="row">
          <div className="col-md-6">
            <p>{settingData.siteName} is a modern e-commerce platform designed to provide customers with a simple, convenient, and reliable online shopping experience. The project offers a wide range of products across different categories, allowing users to easily explore products, view detailed information, compare prices, and find attractive offers. With a clean and responsive interface, {settingData.siteName} is designed to work smoothly across desktops, tablets, and mobile devices. The platform focuses on making product discovery and purchasing easier by providing organized categories, product listings, discounts, best-selling products, and an intuitive navigation system.</p>
            <p>{settingData.siteName} also provides an efficient shopping experience through features such as active product management, category-based filtering, product details, promotional banners, and attractive product sliders. The application is developed using modern web technologies, with React.js used for the frontend and Spring Boot used for backend services and API management. Redux is used for managing application state and handling product and category data efficiently. The project aims to demonstrate how a complete e-commerce application can connect frontend, backend, and database technologies to deliver a practical, user-friendly, and scalable online shopping platform.</p>
            
            <div>
              <a href={settingData.facebook} target='_blank' className="me-2"><i className='fs-3 text-secondary bi bi-facebook'></i></a>
              <a href={settingData.twitter} target='_blank' className="me-2"><i className='fs-3 text-secondary bi bi-twitter'></i></a>
              <a href={settingData.youtube} target='_blank' className="me-2"><i className='fs-3 text-secondary bi bi-youtube'></i></a>
              <a href={settingData.linkedin} target='_blank' className="me-2"><i className='fs-3 text-secondary bi bi-linkedin'></i></a>
              <a href={settingData.instagram} target='_blank' className="me-2"><i className='fs-3 text-secondary bi bi-instagram'></i></a>
            </div>
          </div>
          <div className="col-md-6">
            <img src="/img/carousel-1.jpg" className="img-fluid w-100" style={{height:500}} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
