import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getCheckout } from '../../Redux/ActionCreators/CheckoutActionCreators'

export default function Orders() {
  let [orders, setOrders] = useState([])

  let CheckoutStateData = useSelector(state => state.CheckoutStateData)
  let dispatch = useDispatch()

  useEffect(() => {
    (() => {
      dispatch(getCheckout());
      setOrders(CheckoutStateData)
    })()
  }, [CheckoutStateData.length])
  return (
    <>
      {orders.length ?
      <div className="my-3">
        {orders.map(item=>{
          return <div className='table-responsive' key={item.id}>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Status</th>
                  <th>Payment Mode</th>
                  <th>Payment Status</th>
                  <th>Delivery Address</th>
                  <th>Subtotal</th>
                  <th>Shipping</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
        })}
      </div>
        :
        <div className='card p-5 text-center'>
          <h3>No Order History Found</h3>
          <Link to="/shop" className="btn btn-primary w-25 m-auto">Shop Now</Link>
        </div>
      }
    </>
  )
}
