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
          let address = typeof item.deliveryAddress === "string"
          ? JSON.parse(item.deliveryAddress)
          :item.deliveryAddress;
          let products = typeof item.products === "string"
          ? JSON.parse(item.products)
          :item.products
          return <div className='table-responsive' key={item.id}>
             <h5 className='bg-secondary text-center p-2 text-light'>Order Details</h5>
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
                <tr>
                  <td>{item.id}</td>
                  <td>{item.orderStatus}</td>
                  <td>{item.paymentMode}</td>
                  <td>{item.paymentStatus}</td>
                  <td>
                    <div>
                      <p>{address?.name}</p>
                      <p>{address?.phone},{address?.email}</p>
                      <p>{address?.address}</p>
                      <p>{address?.pin}, {address?.city}, {item.deliveryAddress?.state}</p>
                    </div>
                  </td>
                  <td>&#8377;{item.subtotal}</td>
                  <td>&#8377;{item.shipping}</td>
                  <td>&#8377;{item.total}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
            <h5 className='bg-primary text-center p-2 text-light'>Products In This Order</h5>
            <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Brand</th>
                          <th>Color</th>
                          <th>Size</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        
                        {products?.map(item => {
                          return <tr key={item.id}>
                            <td>
                              <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}/product/${item.pic[0]}`} target="_blank">
                                <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/product/${item.pic[0]}`} height={70} width={70} alt="" /></Link>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.brand}</td>
                            <td>{item.selectedColor}</td>
                            <td>{item.selectedSize}</td>
                            <td>&#8377;{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>&#8377;{item.total}</td>
                            <td>
                              <div className="btn-group">
                                <Link to={`/product/${item.productId}`} className='btn btn-primary'>Buy Again</Link>
                                {item.orderStatus === "Delivered" ? <button className='btn btn-secondary'>Write Review</button>:null}
                              </div>
                            </td>
                          </tr>
                        })}
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
