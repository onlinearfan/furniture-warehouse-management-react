import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAppContext from "../../ContextApi/useAppContext";

const SingleProduct = ({product}) => {
    const {products,setProducts,setMyProducts,myProducts,user} = useAppContext().data;
    // console.log(user.displayName);
    const path = useLocation().pathname;
    const {_id,name,price,desc,imgUrl,supplier_name,quantity,sold} = product;

    const navigate = useNavigate()

    const handleDeleteProduct = (id)=>{
        console.log(id);
        // http://localhost:4000/furniture/delete/1
        let isTrue = window.confirm('Do you want to delete');
        if(isTrue){
            fetch(`http://localhost:4000/furniture/delete/${id}`, {
            method: 'DELETE',
            })
            .then(res=>res.json())
            .then(data=>{
                const newProduct = products.filter((product)=>product._id!=id);
                const newMyProduct = myProducts.filter((product)=>product._id!=id);
                console.log(newProduct);
                //product deleted and set 
                setProducts(newProduct)
                setMyProducts(newMyProduct);
            })
        }
        //this will delete the product by fetch delete method ,
    }

    return (
        <div className="col-lg-4 col-md-6 col-12 my-3">
            <div className="single-product-manage">
                <div className="img">{imgUrl}</div>
                <div className="content">
                    <h1>Name : {name}</h1>
                    <h4>Supplier Name : {supplier_name}</h4>
                    <p>{desc}</p>
                    <span>{price}$ price</span>
                    <span>Sold: {sold} </span>
                    <span>Quantity: {quantity}</span>
                    <br></br>
                    {
                        (path.includes("manage-products") ||
                        path.includes("my-products") )?(
                            <button
                            onClick={() => handleDeleteProduct(_id)}
                            className="btn btn-danger"
                        >
                            Delete Product
                        </button>
                        ):(
                            <button
                            className="btn btn-danger"
                            onClick={() => navigate(`/inventory/${_id}`)}
                        >
                            Update Product
                        </button>
                        )
                    }
                    {/* register user can see this button */}
                    {/* {user?.displayName != supplier_name ? (
                        <></>
                    ) : path.includes("manage-products") ||
                      path.includes("my-products") ? (
                        <button
                            onClick={() => handleDeleteProduct(_id)}
                            className="btn btn-danger"
                        >
                            Delete Product
                        </button>
                    ) : (
                        <button
                            className="btn btn-danger"
                            onClick={() => navigate(`/inventory/${_id}`)}
                        >
                            Update Product
                        </button>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
