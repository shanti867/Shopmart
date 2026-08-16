import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getActiveFaq } from "../Redux/ActionCreators/FaqActionCreators"
import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function Faq() {
  let [selected, setSelected] = useState(0)
  let [settingData, setSettingData] = useState({
    siteName: import.meta.env.VITE_APP_SITE_NAME,
  })
  let SettingStateData = useSelector(state => state.SettingStateData)
  let FaqStateData = useSelector(state => state.FaqStateData)
  let dispatch = useDispatch()

  useEffect(() => {
    (() => {
      dispatch(getSetting())
      if (SettingStateData.length) {
        setSettingData({ siteName: SettingStateData[0].siteName || settingData.siteName })
      }
    })()
  }, [SettingStateData.length])

  useEffect(() => {
    (() =>
      dispatch(getActiveFaq()))()
  }, [FaqStateData.length])
  return (
    <div className="container my-3">
      <h1 className="text-center">Frequently Asked Questions</h1>
      <p className="text-center">Find quick answers to common questions about {settingData.siteName} and its online shopping experience. This section helps customers understand product categories, offers, pricing, ordering, and other important features. Our goal is to provide clear information and make shopping on {settingData.siteName} simple, convenient, and easy to understand.</p>
      <div className="my-3">
        <div className="accordion" id="accordionExample">
          {FaqStateData.map((item, index) => {
            return <div className="accordion-item" key={item.id}>
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button text-secondary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${item.id}`} aria-expanded="true" aria-controls={`#collapse${item.id}`}>
                  {item.question}
                </button>
              </h2>
              <div id={`collapse${item.id}`} className={`accordion-collapse collapse ${index===0?'show':''}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {item.answer}
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

