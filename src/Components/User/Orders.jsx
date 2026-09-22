import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getCheckout } from '../../Redux/ActionCreators/CheckoutActionCreators'
import { getTestimonial, createTestimonial, updateTestimonial } from '../../Redux/ActionCreators/TestimonialActionCreators'

const inputOptions = {
  message: "",
  star: 5

}

export default function Orders() {
  let [orders, setOrders] = useState([])
  let [review, setReview] = useState([])

  let [showModal, setShowModal] = useState(false)
  let [option, setOption] = useState({})

  let [inputData, setInputData] = useState({ ...inputOptions })

  let CheckoutStateData = useSelector(state => state.CheckoutStateData)
  let TestimonialStateData = useSelector(state => state.TestimonialStateData)
  let dispatch = useDispatch()

  function create(product) {
    setShowModal(true)
    setOption({
      type: "Create",
      product: product
    })
    setInputData({ ...inputOptions })
  }

  function update(product) {
    let item = review.find(x => x.product == product.id)
    
    if (!item) {
        return
    }

    setShowModal(true)
    setOption({
      type: "Update",
      product: product
    })
    setInputData({
      message: item.message,
      star: item.star
    })
  }

  function getInputData(e) {
    let { name, value } = e.target
    setInputData({ ...inputData, [name]: value })
  }

  async function postData(e) {
    e.preventDefault()
    if (option.type === "Create") {
      let item = {
        product: option.product.id,
        productName: option.product.name,
        message: inputData.message,
        star: inputData.star

      }
      console.log("Review Data:", item);
      dispatch(createTestimonial(item))
    }
    else {
      let item = review.find(x => x.product == option.product.id)
      let data = {
        ...item,
        message: inputData.message,
        star: inputData.star
      }
      dispatch(updateTestimonial(data.id, data))
    }
    setShowModal(false)
    setInputData({ ...inputOptions })
  }

  function check(pid) {
    let item = review.find(x => x.product == pid)
    return item ? true : false
  }

  useEffect(() => {
    (() => {
      dispatch(getCheckout());
      setOrders(CheckoutStateData)
    })()
  }, [CheckoutStateData.length])

  useEffect(() => {
    dispatch(getTestimonial())
  }, [])

  useEffect(() => {
    setReview(TestimonialStateData)
  }, [TestimonialStateData])

  return (
    <>
      {orders.length ?
        <div className="my-3">
          {orders.map(item => {
            let address = typeof item.deliveryAddress === "string"
              ? JSON.parse(item.deliveryAddress)
              : item.deliveryAddress;
            let products = typeof item.products === "string"
              ? JSON.parse(item.products)
              : item.products
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
                    <td>{item.checkoutId}</td>
                    <td>{item.orderStatus}</td>
                    <td>{item.paymentMode}</td>
                    <td>{item.paymentStatus}</td>
                    <td>
                      <div>
                        <p>{address?.name}</p>
                        <p>{address?.phone},{address?.email}</p>
                        <p>{address?.address}</p>
                        <p>{address?.pin}, {address?.city}, {address?.state}</p>
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

                  {products?.map(record => {
                    return <tr key={record.id}>
                      <td>
                        <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}/product/${record.pic[0]}`} target="_blank">
                          <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/product/${record.pic[0]}`} height={70} width={70} alt="" /></Link>
                      </td>
                      <td>{record.name}</td>
                      <td>{record.brand}</td>
                      <td>{record.selectedColor}</td>
                      <td>{record.selectedSize}</td>
                      <td>&#8377;{record.price}</td>
                      <td>{record.quantity}</td>
                      <td>&#8377;{record.total}</td>
                      <td>
                        <div className="btn-group">
                          <Link to={`/product/${record.productId}`} className='btn btn-primary'>Buy Again</Link>
                          {item.orderStatus === "Delivered" ? check(record.productId) ? <button className='btn btn-primary' onClick={() => update({ id: record.productId, name: record.name })}>Update Review</button> :
                            <button className='btn btn-secondary' onClick={() => create({ id: record.productId, name: record.name })}>Write Review</button> : null}
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

      <div className={`modal fade ${showModal ? "show d-block" : ""}`} id="exampleModal">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{option.type}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={postData}>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label>Message*</label>
                    <textarea name="message" rows={8} value={inputData.message} onChange={getInputData} required placeholder='Message' className="form-control border-primary" />
                  </div>

                  <div className="col-12 mb-3">
                    <label>Star*</label>
                    <select name="star" value={inputData.star} onChange={getInputData} className='form-select'>
                      <option>5</option>
                      <option>4</option>
                      <option>3</option>
                      <option>2</option>
                      <option>1</option>
                    </select>
                  </div>

                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary w-100">{option.type}</button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
