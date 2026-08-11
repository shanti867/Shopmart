import React, { useEffect, useRef, useState } from 'react'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import ImageValidator from '../../../FormValidators/ImageValidator'
import TextValidator from '../../../FormValidators/TextValidator'

import { useDispatch, useSelector } from 'react-redux';

import { createProduct } from '../../../Redux/ActionCreators/ProductActionCreators '
import { getActiveSubcategory } from '../../../Redux/ActionCreators/SubcategoryActionCreators'
import { getActiveBrand } from '../../../Redux/ActionCreators/BrandActionCreators'


import RichTextEditor from '../../../rte/RichTextEditor'
import { createStructuredContent, renderHTML } from '../../../rte/richTextEditorBridge';
import { getActiveMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreators'

const colors = ["Black", "White", "Blue", "Red", "Green", "Gray", "Pink", "Yellow", "Magenta", "purple", "Orange", "N/A"]
const sizes = ["XXL", "XL", "L", "MD", "SM", "XS", "NB", "22", "24", "26", "28", "30", "32", "34", "36", "38", "40", "N/A"]
export default function AdminProductcreatePage() {
    let editorRefDescription = useRef(null)
    let [description, setDescription] = useState("")
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: [],
        size: [],
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        stock: true,
        stockQuantity: 0,
        pic: [],
        status: true
    })
    function changeDescription(documentModel, nextHtml) {
        setDescription(nextHtml !== undefined ? nextHtml : renderHTML(documentModel))
    }
    function handleChangeDescription(nextHtml, editor) {
        changeDescription(editor.getJSON(), nextHtml)
    }
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        basePrice: "Base Price Field is Mendatory",
        discount: "Discount Field is Mendatory",
        stockQuantity: "Stock Quantity Field is Mendatory",
        color: "Please Select Atleast one color",
        size: "Please Select Atleast one size",
        pic: "Pic Field is Mendatory"

    })
    let [show, setShow] = useState(false)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData.maincategory)
    let ActiveMaincategoryStateData = useSelector(state => state.MaincategoryStateData.activeMaincategory)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function getInputCheckbox(name, value) {
        let arr = data[name]
        if (arr.includes(value)) {
            arr = arr.filter(x => x !== value)
        }
        else {
            arr.push(value)
        }
        setData({ ...data, [name]: arr })
        setErrorMessage({ ...errorMessage, [name]: arr.length === 0 ? `Please Select Atleast One ${name}` : "" })
    }
    function getInputData(e) {

        let name = e.target.name;
        let value;

        if (name === "pic") {
            value = Array.from(e.target.files)
        }
        else if (name === "status" || name === "stock") {
            value = e.target.value === "1"
        }
        else {
            value = e.target.value;
        }

        setData({ ...data, [name]: value });

        setErrorMessage({
            ...errorMessage,
            [name]: name === "pic"
                ? ImageValidator(e)
                : TextValidator(e)
        });
    }

    function postData(e) {
        e.preventDefault()

        let error = Object.values(errorMessage).find(x => x != "")
        if (error) {
            setShow(true)
        }
        else {
            let bp = parseInt(data.basePrice)
            let d = parseInt(data.discount)
            let fp = parseInt(bp - (bp * d) / 100)
            let formData = new FormData()
            formData.append("name", data.name)
            data.pic.forEach(x => {
                formData.append("pic", x)
            })
            formData.append("status", data.status)
            formData.append("mainCategoryId", data.maincategory || MaincategoryStateData[0]?.id)
            formData.append("subCategoryId", data.subcategory || SubcategoryStateData[0]?.id)
            formData.append("brandId", data.brand || BrandStateData[0]?.id)
            formData.append("basePrice", bp)
            formData.append("discount", d)
            formData.append("finalPrice", fp)
            formData.append("stock", data.stock)
            formData.append("stockQuantity", data.stockQuantity)
            data.color.forEach(x => {
                formData.append("color", x)
            })
            data.size.forEach(x => {
                formData.append("size", x)
            })
            formData.append("description", description)

            try {

                dispatch(createProduct(formData))
                // navigate("/admin/product")
                setTimeout(() => {
                    navigate("/admin/product")
                }, 500)
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        dispatch(getActiveMaincategory())
    }, [MaincategoryStateData.length])

    useEffect(() => {
        dispatch(getActiveBrand())
    }, [BrandStateData.length])

    useEffect(() => {
        dispatch(getActiveSubcategory())
    }, [SubcategoryStateData.length])


    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light text-center p-2'>Create Product<Link to="/admin/product"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} placeholder='Product Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-xl-3 col-md-3 mb-3">
                                    <label>Maincategory*</label>
                                    <select name="maincategory" onChange={getInputData} className='form-select border-primary'>
                                        {ActiveMaincategoryStateData.map((item) => {
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-xl-3 col-md-3 mb-3">
                                    <label>Subcategory*</label>
                                    <select name="subcategory" onChange={getInputData} className='form-select border-primary'>
                                        {SubcategoryStateData.map((item) => {
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-xl-3 col-md-3 mb-3">
                                    <label>Brand*</label>
                                    <select name="brand" onChange={getInputData} className='form-select border-primary'>
                                        {BrandStateData.map((item) => {
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-xl-3 col-md-3 mb-3">
                                    <label>Stock*</label>
                                    <select name="stock" onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">In Stock</option>
                                        <option value="0">Out Of Stock</option>
                                    </select>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label>Base Price*</label>
                                    <input type="number" name="basePrice" onChange={getInputData}
                                        placeholder='Product Base Price' className={`form-control 
                                     ${show && errorMessage.basePrice ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.basePrice ? <p className='text-danger text-capitalize'>{errorMessage.basePrice}</p> : null}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label>Discount*</label>
                                    <input type="number" name="discount" onChange={getInputData}
                                        placeholder='Product Discount' className={`form-control 
                                     ${show && errorMessage.discount ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.discount ? <p className='text-danger text-capitalize'>{errorMessage.discount}</p> : null}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label>Stock Quantity*</label>
                                    <input type="number" name="stockQuantity" onChange={getInputData}
                                        placeholder='Product Stock Quantity' className={`form-control 
                                     ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.stockQuantity ? <p className='text-danger text-capitalize'>{errorMessage.stockQuantity}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Color*</label>
                                    <div className="border border-primary rounded m-1 row">
                                        {colors.map((item, index) => {
                                            return <div key={index} className='col-md-2 col-3 my-2'>
                                                <label htmlFor={item} style={{ display: "inline-block", width: 60 }}>{item}</label>
                                                <input type="checkbox" onChange={() => getInputCheckbox('color', item)} checked={data?.color?.includes(item)} name={item} id={item} className='ms-2' />
                                            </div>
                                        })}
                                    </div>
                                    {show && errorMessage.color ? <p className='text-danger text-capitalize'>{errorMessage.color}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Size*</label>
                                    <div className="border border-primary rounded m-1 row">
                                        {sizes.map((item, index) => {
                                            return <div key={index} className='col-md-2 col-3 my-2'>
                                                <label htmlFor={item} style={{ display: "inline-block", width: 60 }}>{item}</label>
                                                <input type="checkbox" onChange={() => getInputCheckbox('size', item)} checked={data?.size?.includes(item)} name={item} id={item} className='ms-2' />
                                            </div>
                                        })}
                                    </div>
                                    {show && errorMessage.size ? <p className='text-danger text-capitalize'>{errorMessage.size}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Description*</label>
                                    <RichTextEditor
                                        ref={editorRefDescription}
                                        onChange={handleChangeDescription}
                                        value={description ?? ""}
                                        className="border-primary"
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" multiple onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.pic ? errorMessage.pic?.split("|").map((item, index) => {
                                        return <p className='text-danger text-capitalize' key={index}>{item}</p>
                                    }) : null}
                                </div>

                                <div className="col-md-6 md-3">
                                    <label>Status*</label>
                                    <select name="status" onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button type='submit' className='btn btn-primary w-100'>Create</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
