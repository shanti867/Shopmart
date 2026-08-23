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

import AdminBrandPage from './Pages/Admin/Brand/AdminBrandPage'
import AdminBrandcreatePage from './Pages/Admin/Brand/AdminBrandcreatePage'
import AdminBrandUpdatePage from './Pages/Admin/Brand/AdminBrandUpdatePage'

import AdminFeaturePage from './Pages/Admin/Feature/AdminFeaturePage'
import AdminFeaturecreatePage from './Pages/Admin/Feature/AdminFeaturecreatePage'
import AdminFeatureUpdatePage from './Pages/Admin/Feature/AdminFeatureUpdatePage'

import AdminFaqPage from './Pages/Admin/Faq/AdminFaqPage'
import AdminFaqcreatePage from './Pages/Admin/Faq/AdminFaqcreatePage'
import AdminFaqUpdatePage from './Pages/Admin/Faq/AdminFaqUpdatePage'

import AdminProductPage from './Pages/Admin/Product/AdminProductPage'
import AdminProductcreatePage from './Pages/Admin/Product/AdminProductcreatePage'
import AdminProductUpdatePage from './Pages/Admin/Product/AdminProductUpdatePage'

import AdminSettingPage from './Pages/Admin/Setting/AdminSettingPage'
import SignupPage from './Pages/User/SignupPage'
import LoginPage from './Pages/User/LoginPage'
import ProfilePage from './Pages/User/ProfilePage'
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

          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/*' element={<ErrorPage />} />
          {/*User Routes*/}
          <Route path='/profile' element={<ProfilePage />} />
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

           <Route path='/admin/brand' element={<AdminBrandPage />} />
          <Route path='/admin/brand/create' element={<AdminBrandcreatePage />} />
          <Route path='/admin/brand/update/:id' element={<AdminBrandUpdatePage />} />

          <Route path='/admin/feature' element={<AdminFeaturePage />} />
          <Route path='/admin/feature/create' element={<AdminFeaturecreatePage />} />
          <Route path='/admin/feature/update/:id' element={<AdminFeatureUpdatePage />} />

          <Route path='/admin/faq' element={<AdminFaqPage />} />
          <Route path='/admin/faq/create' element={<AdminFaqcreatePage />} />
          <Route path='/admin/faq/update/:id' element={<AdminFaqUpdatePage />} />

          
          <Route path='/admin/product' element={<AdminProductPage />} />
          <Route path='/admin/product/create' element={<AdminProductcreatePage />} />
          <Route path='/admin/product/update/:id' element={<AdminProductUpdatePage />} />

          <Route path='/admin/setting' element={<AdminSettingPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
