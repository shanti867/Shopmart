import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Breadcrum from '../../Components/Breadcrum'
import { getCart } from "../../Redux/ActionCreators/CartActionCreators"
import {createCheckout} from "../../Redux/ActionCreators/CheckoutActionCreators"


export default function CheckOutPage() {
    let [user, setUser] = useState({})
    let [subtotal, setSubtotal] = useState(0);
    let [shipping, setShipping] = useState(0);
    let [total, setTotal] = useState(0);

    let [selected, setSelected] = useState({
        deliveryAddress: {},
        paymentMode: "COD"
    })
    let CartStateData = useSelector(state => state.CartStateData)
    
    let data = CartStateData
    let dispatch = useDispatch()
    let navigate =useNavigate()
    
    async function makePayment(checkoutId){
        try{
            let token = Cookies.get("token");

            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/payment/create-order`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify({
                    checkoutId:checkoutId
                })
            })
            let result = await response.json();
            console.log("Razorpay Order Response:",result)

            if(!response.ok || !result.status){
                alert(result.message || "Unable to create Razorpay order");
                return;
            }
            let options = {
                key: result.key,
                amount: result.amount,
                currency: result.currency,
                name:"Shopmart",
                description: "Shopmart Order Payment",
                order_id: result.razorpayOrderId,

                handler: async function(paymentResponse){
                    console.log("Payment Response:", paymentResponse);

                    let verifyResponse = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/payment/verify`,{
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json",
                            "Authorization":`Bearer ${token}`
                        },
                        body: JSON.stringify({
                            checkoutId: checkoutId,
                            razorpayOrderId: paymentResponse.razorpay_order_id,
                            razorpayPaymentId: paymentResponse.razorpay_payment_id,
                            razorpaySignature: paymentResponse.razorpay_signature,
                        })
                    })
                    let verifyResult = await verifyResponse.json();
                    console.log("Payment Verification:", verifyResult);

                    if(verifyResult.status){
                        alert("Payment Successful!");
                        navigate("/order-confirmation");
                    }
                    
                    else{
                        alert(verifyResult.message || "Payment verification failed")
                    }
                },
                prefill:{
                    name: user.data?.[0]?.name || "",
                    email: user.data?.[0]?.email || "",
                    phone: user.data?.[0]?.phone || ""
                },
                theme:{
                    color: "#0d6efd"
                }
            }
            let razorpay = new window.Razorpay(options)
            razorpay.on("payment.failed", function(response){
                console.log("Payment Failed:", response.error);
                alert(response.error.description || "Payment Failed");
            })
            razorpay.open()
        }
        catch(error){
            console.log("Payment Error:", error);
            alert("Something went wrong while starting payment")
        }
    }

    async function placeOrder(){

        try{
            let token = Cookies.get("token")

        let item={
            // user:Cookies.get("userid"),
            deliveryAddress:selected.deliveryAddress,
            orderStatus: "Order Has Been Placed",
            paymentMode: selected.paymentMode,
            paymentStatus:"Pending",
            subtotal:subtotal,
            shipping:shipping,
            total:total,
            date: new Date(),
            products: data
        }

        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/checkout`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(item)
        })
        let result = await response.json();
        console.log("Checkout Response:", result);

        if(!response.ok){
            alert(result.message || "Unable to create checkout");
            return;
        }
        let checkout = result.data || result;
        console.log("Created Checkout:", checkout);

        if(!checkout.id){
           alert("Checkout ID not received from server");
           return; 
        }
        if(selected.paymentMode === "COD"){
            navigate("/order-confirmation");
        }
        else{
            await makePayment(checkout.id);
        }
    }
    catch(error){
        console.log("Place Order Error:", error)
        alert("Something went wrong while placing the order")
    }
        
        // navigate("/order-confirmation")
    }
    function calculate(cart) {
        let sum = 0;
        cart.forEach(x => sum = sum + x.total)
        if (sum > 0 && sum < 1000) {
            setTotal(sum + 150)
            setShipping(150)
        }
        else {
            setTotal(sum)
            setShipping(0)
        }
        setSubtotal(sum)
    }
    useEffect(() => {
        (() => {
            dispatch(getCart())
        })()
    }, [CartStateData.length])

    useEffect(() => {
        if (Array.isArray(CartStateData)) {
            calculate(CartStateData);
        }
    }, [CartStateData]);

    useEffect(() => {
        (async () => {
            try {
                let token = Cookies.get("token");
                let response = await fetch(
                    `${import.meta.env.VITE_APP_BACKEND_SERVER}/user/address`,
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                let result = await response.json();
                setUser(result);
                if (result.data)
                    setSelected({ ...selected, deliveryAddress: result.data[0] })

            }
            catch (error) {
                console.log("8. ERROR:", error);
            }
        })();
    }, []);
    

    // useEffect(()=>{
    //     (()=> dispatch(getActiveProduct()))()
    // },[ProductStateData.length])
    return (
        <>
            <Breadcrum title="Checkout" />
            <div className="container-fluid bg-light overflow-hidden py-5">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-6 col-xl-6 wow fadeInUp" data-wow-delay="0.3s">
                            <h3 className="mb-4 wow fadeInUp" data-wow-delay="0.1s">Billing details</h3>
                            {user.data?.length !==0?
                            user.data?.map((item, index) => {
                                return <div key={index} className='card p-3 mb-3' onClick={() => setSelected({ ...selected, deliveryAddress: item })}>
                                    <h6>{item.name}</h6>
                                    <p>{item.phone},{item.email}</p>
                                    <p>{item.address}</p>
                                    <p>{item.pin},{item.city},{item.state}</p>
                                    {selected.deliveryAddress.address === item.address ? <i className='bi bi-check fs-3 m-3 position-absolute end-0'></i> : null}
                                </div>
                            }):
                            <div className="card p-5 text-center">
                                <h3>Delivery Address Not Found</h3>
                                <h4>Please Create atleast One Delivery Address</h4>
                                <Link to="/profile?option=Address" className="btn btn-primary w-100 m-auto">Create Address</Link>
                            </div>
                            }
                        </div>
                        <div className="col-lg-6 col-xl-6 wow fadeInUp" data-wow-delay="0.3s">
                            <h3 className="mb-4 wow fadeInUp" data-wow-delay="0.1s">Items In Carts</h3>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr className="text-center">
                                            <th scope="col" className="text-start">Name</th>
                                            <th scope="col">Brand</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(item => {
                                            return <tr key={item.id} className="text-center">
                                                <td scope="row" className="text-start py-4">
                                                    <h6>{item.name}</h6>
                                                    <p>{item.selectedColor}/{item.selectedSize}</p>
                                                </td>
                                                <td className="py-4">{item.brand}</td>
                                                <td className="py-4">&#8377;{item.price}</td>
                                                <td className="py-4 text-center">{item.quantity}</td>
                                                <td className="py-4">&#8377;{item.total}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Subtotal</th>
                                            <td>&#8377;{subtotal}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping</th>
                                            <td>&#8377;{shipping}</td>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <td>&#8377;{total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-2">
                                <div className="col-6">
                                    <div className="form-check text-start my-2">
                                        <input type="checkbox" className="form-check-input bg-primary border-0" id="cod" onChange={() => setSelected({ ...selected, paymentMode: "COD" })} checked={selected.paymentMode === "COD" ? true : false} />
                                        <label className="form-check-label" htmlFor="cod">COD</label>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-check text-start my-2">
                                        <input type="checkbox" className="form-check-input bg-primary border-0" id="netbanking" onChange={() => setSelected({ ...selected, paymentMode: "Online" })} checked={selected.paymentMode !== "COD" ? true : false} />
                                        <label className="form-check-label" htmlFor="netbanking">Online Payment</label>
                                    </div>
                                </div>
                            </div>
                            {user.data?.length !==0? <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                                <button type="button" onClick={placeOrder}
                                    className="btn btn-primary border-secondary text-uppercase w-100 text-primary">Place Order</button>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
