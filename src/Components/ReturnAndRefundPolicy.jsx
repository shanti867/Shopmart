import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../Components/Breadcrum'
import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"

export default function ReturnAndRefundPolicy() {
  let [settingData, setSettingData] = useState({
    refundPolicy: ""
  })
  let SettingStateData = useSelector(state => state.SettingStateData)
  let dispatch = useDispatch()
  useEffect(() => {
    (() => {
      dispatch(getSetting())
      if (SettingStateData.length) {
        setSettingData({refundPolicy: SettingStateData[0].refundPolicy ?? ""})
      }
    })()
  }, [SettingStateData.length])
  return (
    <>
      <Breadcrum title="Return And Refund Policy" />
      <div className="container my-3">
        <div dangerouslySetInnerHTML={{ __html: settingData.refundPolicy}}/>
      </div>
    </>
  )
}
