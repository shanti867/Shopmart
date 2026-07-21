import React, { useEffect, useRef, useState } from 'react'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import ImageValidator from '../../../FormValidators/ImageValidator'
import TextValidator from '../../../FormValidators/TextValidator'

import { useDispatch, useSelector } from 'react-redux';
// import { createProduct, getProduct } from '../../../Redux/ActionCreators/ProductActionCreators'
import { createProduct, getProduct } from '../../../Redux/ActionCreators/ProductActionCreators '

import RichTextEditor from '../../../rte/RichTextEditor'
import { createStructuredContent, renderHTML } from '../../../rte/richTextEditorBridge';
export default function AdminProductcreatePage() {
    let editorRefDescription = useRef(null)
    let [description, setDescription] = useState("")
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        Product: "",
        color: [],
        size: [],
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        stock: true,
        stockQuantity: 0,
        pic: "",
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
        pic: "Pic Field is Mendatory"
    })
    let [show, setShow] = useState(false)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    function getInputData(e) {

        let name = e.target.name;
        let value;

        if (name === "pic") {
            value = e.target.files[0];
        }
        else if (name === "status") {
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
        let item = {
            ...data,
            description: description,
        }
        let error = Object.values(errorMessage).find(x => x != "")
        if (error) {
            setShow(true)
        }
        else {
            let formData = new FormData();
            formData.append("name", data.name);
            formData.append("pic", data.pic);
            formData.append("status", data.status);
            try {
                let item = ProductStateData.find(x => x.name?.toLocaleLowerCase() === data.name?.toLocaleLowerCase())
                if (item) {
                    setErrorMessage({ ...errorMessage, name: 'Product With This Name Already Exist' })
                    setShow(true)
                    return
                }
                dispatch(createProduct(formData))
                navigate("/admin/product")
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        dispatch(getProduct());
        (() => {
                    if (ProductStateData.length) {
                        setData({ ...data, ...ProductStateData })
        
                        setTimeout(() => {
                            const documentModel1 = createStructuredContent(ProductStateData.description ?? "")
                            changePrivacyPolicy(documentModel1, ProductStateData.description ?? "")
                        }, 500)
                    }
                })()

    }, [ProductStateData.length])

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

                                <div className="col-12 mb-3">
                                    <label>Description</label>
                                    <RichTextEditor
                                        ref={editorRefDescription}
                                        onChange={handleChangeDescription}
                                        value={description?? ""}
                                        className="border-primary"
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.pic ? <p className='text-danger text-capitalize'>{errorMessage.pic}</p> : null}
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
