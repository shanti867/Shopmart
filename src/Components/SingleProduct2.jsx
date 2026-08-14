import React from 'react'

export default function SingleProduct2({item}) {
  return (
    <div className="productImg-carousel  productList-item">
                                    <div className="productImg-item products-mini-item border">
                                        <div className="row g-0">
                                            <div className="col-5">
                                                <div className="products-mini-img border-end h-100">
                                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/product/${item.pic[0]}`} style={{height:180}} className="img-fluid w-100 h-100" alt="Image" />
                                                    <div className="products-mini-icon rounded-circle bg-primary">
                                                        <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-7">
                                                <div className="products-mini-content p-3">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br /> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="products-mini-add border p-3">
                                            <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                                className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                            <div className="d-flex">
                                                <a href="#"
                                                    className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                        className="rounded-circle btn-sm-square border"><i
                                                            className="fas fa-random"></i></span></a>
                                                <a href="#"
                                                    className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                        className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="productImg-item products-mini-item border">
                                        <div className="row g-0">
                                            <div className="col-5">
                                                <div className="products-mini-img border-end h-100">
                                                    <img src="img/product-4.png" className="img-fluid w-100 h-100" alt="Image" />
                                                    <div className="products-mini-icon rounded-circle bg-primary">
                                                        <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-7">
                                                <div className="products-mini-content p-3">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br /> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="products-mini-add border p-3">
                                            <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                                className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                            <div className="d-flex">
                                                <a href="#"
                                                    className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                        className="rounded-circle btn-sm-square border"><i
                                                            className="fas fa-random"></i></span></a>
                                                <a href="#"
                                                    className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                        className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="productImg-item products-mini-item border">
                                        <div className="row g-0">
                                            <div className="col-5">
                                                <div className="products-mini-img border-end h-100">
                                                    <img src="img/product-6.png" className="img-fluid w-100 h-100" alt="Image" />
                                                    <div className="products-mini-icon rounded-circle bg-primary">
                                                        <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-7">
                                                <div className="products-mini-content p-3">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br /> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="products-mini-add border p-3">
                                            <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                                className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                            <div className="d-flex">
                                                <a href="#"
                                                    className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                        className="rounded-circle btn-sm-square border"><i
                                                            className="fas fa-random"></i></span></a>
                                                <a href="#"
                                                    className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                        className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="productImg-item products-mini-item border">
                                        <div className="row g-0">
                                            <div className="col-5">
                                                <div className="products-mini-img border-end h-100">
                                                    <img src="img/product-7.png" className="img-fluid w-100 h-100" alt="Image" />
                                                    <div className="products-mini-icon rounded-circle bg-primary">
                                                        <a href="#"><i className="fa fa-eye fa-1x text-white"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-7">
                                                <div className="products-mini-content p-3">
                                                    <a href="#" className="d-block mb-2">SmartPhone</a>
                                                    <a href="#" className="d-block h4">Apple iPad Mini <br /> G2356</a>
                                                    <del className="me-2 fs-5">$1,250.00</del>
                                                    <span className="text-primary fs-5">$1,050.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="products-mini-add border p-3">
                                            <a href="#" className="btn btn-primary border-secondary rounded-pill py-2 px-4"><i
                                                className="fas fa-shopping-cart me-2"></i> Add To Cart</a>
                                            <div className="d-flex">
                                                <a href="#"
                                                    className="text-primary d-flex align-items-center justify-content-center me-3"><span
                                                        className="rounded-circle btn-sm-square border"><i
                                                            className="fas fa-random"></i></span></a>
                                                <a href="#"
                                                    className="text-primary d-flex align-items-center justify-content-center me-0"><span
                                                        className="rounded-circle btn-sm-square border"><i className="fas fa-heart"></i></span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
  )
}
