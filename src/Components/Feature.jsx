import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getActiveFeature } from "../Redux/ActionCreators/FeatureActionCreators"
import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function Feature() {
  let [settingData, setSettingData] = useState({
    siteName: import.meta.env.VITE_APP_SITE_NAME,
  })
  let SettingStateData = useSelector(state => state.SettingStateData)
  let FeatureStateData = useSelector(state => state.FeatureStateData)
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
      dispatch(getActiveFeature()))()
  }, [FeatureStateData.length])
  return (
    <>
      <div className="container my-5 py-5">
        <h1 className="text-center">Why Shop With Confidence at {settingData.siteName} ?</h1>
        <p className="text-center">{settingData.siteName} provides useful features designed to make online shopping simple and enjoyable. Customers can explore products by category, view detailed product information, discover special offers, check discounted and best-selling products, and easily navigate through the website. The responsive design ensures a smooth shopping experience across different devices.</p>
         <div className="row my-5">
          {FeatureStateData.map(item=>{
            return <div key={item.id} className='col-lg-4 col-md-6'>
              <div className="card my-card p-5 mb-3" style={{height:450 }}>
              <div className="text-center">
                <span dangerouslySetInnerHTML={{__html:item.icon}} className='fs-1'></span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.shortDescription}</p>
              </div>
              </div>
          })}
         </div>
      </div>
    </>
  )
}
