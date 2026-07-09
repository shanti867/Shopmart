import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import ShopPage from './Pages/ShopPage'
import ProductPage from './Pages/ProductPage'
import FeaturePage from './Pages/FeaturePage'
import FaqPage from './Pages/FaqPage'
import TestimonialPage from './Pages/TestimonialPage'
import CartPage from './Pages/User/CartPage'
import CheckOutPage from './Pages/User/CheckOutPage'
import ErrorPage from './Pages/ErrorPage'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import TermsAndConditions from './Pages/TermsAndConditions'
import ContactUsPage from './Pages/ContactUsPage'
import AboutPage from './Pages/AboutPage'
import ReturnAndRefundPolicy from './Components/ReturnAndRefundPolicy'
import AdminHomePage from './Pages/Admin/AdminHomePage'
import AdminMaincategoryPage from './Pages/Admin/Maincategory/AdminMaincategoryPage'
import AdminMaincategorycreatePage from './Pages/Admin/Maincategory/AdminMaincategorycreatePage'
import AdminMaincategoryUpdatePage from './Pages/Admin/Maincategory/AdminMaincategoryUpdatePage'

import AdminSubcategoryPage from './Pages/Admin/Subcategory/AdminSubcategoryPage'
import AdminSubcategorycreatePage from './Pages/Admin/Subcategory/AdminSubcategorycreatePage'
import AdminSubcategoryUpdatePage from './Pages/Admin/Subcategory/AdminSubcategoryUpdatePage'
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path='/feature' element={<FeaturePage />} />
          <Route path='/faq' element={<FaqPage />} />
          <Route path='/testimonial' element={<TestimonialPage />} />
          <Route path='/contact' element={<ContactUsPage />} />

          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/refund-policy' element={<ReturnAndRefundPolicy />} />
          <Route path='/tc' element={<TermsAndConditions />} />
          <Route path='/*' element={<ErrorPage />} />
          {/*User Routes*/}
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckOutPage />} />

          {/*Admin Routes*/}
          <Route path='/admin' element={<AdminHomePage />} />
          <Route path='/admin/maincategory' element={<AdminMaincategoryPage />} />
          <Route path='/admin/maincategory/create' element={<AdminMaincategorycreatePage />} />
          <Route path='/admin/maincategory/update/:id' element={<AdminMaincategoryUpdatePage />} />

          <Route path='/admin/subcategory' element={<AdminSubcategoryPage />} />
          <Route path='/admin/subcategory/create' element={<AdminSubcategorycreatePage />} />
          <Route path='/admin/subcategory/update/:id' element={<AdminSubcategoryUpdatePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
