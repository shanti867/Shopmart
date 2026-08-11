import React, { useEffect, useState } from 'react'

import { Swiper,SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import Service from '../Components/Service'
import Offer from '../Components/Offer'
import Products from '../Components/Products'
import SaleBanner from '../Components/SaleBanner'
import ProductsSlider from '../Components/ProductsSlider'
import BestSellerProducts from '../Components/BestSellerProducts'

import {getMaincategory, getActiveMaincategory} from "../Redux/ActionCreators/MaincategoryActionCreators"
// import {getProduct} from "../Redux/ActionCreators/ProductActionCreators"
import{getProduct} from "../Redux/ActionCreators/ProductActionCreators "
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function HomePage() {
    let slideOptions={
        loop:true,
         autoplay:{
          delay: 2000,
          disableOnInteraction: false,
           
        },
        modules:[Autoplay]
    }
    let [data, setData] = useState([])
    let MaincategoryStateData = useSelector(state=>state.MaincategoryStateData)
    let ActiveMaincategoryStateData = useSelector(state=>state.MaincategoryStateData.activeMaincategory)
    let ProductStateData = useSelector(state=>state.ProductStateData)
    let dispatch = useDispatch()

    useEffect(()=>{
        (()=>{
            dispatch(getActiveMaincategory())
        })()
    },[MaincategoryStateData.length])

    useEffect(()=>{
        (()=>{
            dispatch(getProduct())
            if(ProductStateData.length){
                setData(ProductStateData.slice(0,4))
            }
        })()
    },[ProductStateData.length])
  return (
    <>
    <div className="container-fluid carousel bg-light px-0">
        <div className="row g-0 justify-content-end">
            <div className="col-12 col-lg-7 col-xl-9">
                <div className="header-carousel bg-light py-5">
                    <Swiper {...slideOptions}>
                        <SwiperSlide>
                    <div className="row g-0 header-carousel-item align-items-center">
                        <div className="col-xl-6 carousel-img wow fadeInLeft" data-wow-delay="0.1s">
                            <img src="img/carousel-1.png" className="img-fluid w-100" alt="Image"/>
                        </div>
                        <div className="col-xl-6 carousel-content p-4">
                            <h4 className="text-uppercase fw-bold mb-4 wow fadeInRight" data-wow-delay="0.1s"
                                style={{letterSpacing: "3px"}}>Save Up To 90%</h4>
                            <h1 className="display-3 text-capitalize mb-4 wow fadeInRight" data-wow-delay="0.3s">On Selected
                                Electronics Products</h1>
                            <p className="text-dark wow fadeInRight" data-wow-delay="0.5s">Terms and Condition Apply</p>
                            <Link className="btn btn-primary rounded-pill py-3 px-5 wow fadeInRight" data-wow-delay="0.7s"
                                to="/shop">Shop Now</Link>
                        </div>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="row g-0 header-carousel-item align-items-center">
                        <div className="col-xl-6 carousel-img wow fadeInLeft" data-wow-delay="0.1s">
                            <img src="img/carousel-2.png" className="img-fluid w-100" alt="Image"/>
                        </div>
                        <div className="col-xl-6 carousel-content p-4">
                            <h4 className="text-uppercase fw-bold mb-4 wow fadeInRight" data-wow-delay="0.1s"
                                style={{letterSpacing: "3px"}}>Save Up To 95%</h4>
                            <h1 className="display-3 text-capitalize mb-4 wow fadeInRight" data-wow-delay="0.3s">On Selected
                                Top Brand Clothes and Other Products</h1>
                            <p className="text-dark wow fadeInRight" data-wow-delay="0.5s">Terms and Condition Apply</p>
                            <Link className="btn btn-primary rounded-pill py-3 px-5 wow fadeInRight" data-wow-delay="0.7s"
                                to="/shop">Shop Now</Link>
                        </div>
                    </div>
                    </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            {data.length?
            <div className="col-12 col-lg-5 col-xl-3 wow fadeInRight" data-wow-delay="0.1s">
                <div className="carousel-header-banner h-100">
                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/product/${data[0].pic[2]}`} className="img-fluid w-100 h-100" style={{objectFit: "cover"}} alt="Image"/>
                    <div className="carousel-banner-offer">
                        <p className="bg-primary text-white rounded fs-5 py-2 px-4 mb-0 me-3">Save &#8377;{data[0].basePrice-data[0].finalPrice}</p>
                        <p className="text-light fs-5 fw-bold mb-0">{data[0].discount}% Off</p>
                    </div>
                    <div className="carousel-banner">
                        <div className="carousel-banner-content text-center p-4">
                            <Link to={`/shop?mc=${data[0]?.maincategory.name}`} className="text-light d-block mb-2">{data[0]?.maincategory.name}</Link>
                            <Link to={`/product/${data[0].id}`} className="d-block text-white fs-3">{data[0].name}</Link>
                            <del className="me-2 text-white fs-5">&#8377;{data[0].basePrice}</del>
                            <span className="text-light fs-5">&#8377;{data[0].finalPrice}</span>
                        </div>
                        <Link to={`/product/${data[0].id}`} className="btn btn-primary rounded-pill py-2 px-4"><i
                                className="fas fa-shopping-cart me-2"></i> Add To Cart</Link>
                    </div>
                </div>
            </div>:null}
        </div>
    </div>
    <Service/>
    <Offer/>
    <Products maincategory={ActiveMaincategoryStateData}/>
    <SaleBanner/>
    <ProductsSlider/>
    <BestSellerProducts/>
    </>
  )
}
