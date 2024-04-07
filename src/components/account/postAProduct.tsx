import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { ProductInfo } from "../../models/models";

function PostAProduct({data}:any) {

    const navigate = useNavigate();

    const [recentUser, setRecentUser] = useState(data || {
        username: '',
        email: '',
        profile_image_link: '',
        products: [],
    })

    const [product_info, setproduct_info] = useState({
        productname: '',
        description: '',
        price: '',
        imagelink: '',
        Category: ''
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setproduct_info({ ...product_info, [name]: value });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (!product_info.productname || !product_info.price) {
            alert('Please fill out the product name and price.');
            return;
        }
        try {
          const response = await fetch(`api`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(product_info)
          });
    
          if (response.ok) {
            const result = await response.json();
            console.log(result);
            alert('Product posted successfully!');
            navigate(-1);
        } else {
            const error = await response.text();
            throw new Error(error);
        }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return(
        <div className="container rounded bg-white mt-5 mb-5">
             <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="150px" src={recentUser.profile_image_link} />
                    </div>
                    <div>{recentUser.username}</div>
                    <div>{recentUser.email}</div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Post A Product</h4>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Product Name</label><input type="text" className="form-control" placeholder="enter product name" name= "productname" value={product_info.productname} onChange={handleChange} required/></div>
                            <div className="col-md-12"><label className="labels">Description</label><input type="text" className="form-control" placeholder="enter discription" name= "description" value={product_info.description} onChange={handleChange} required/></div>
                            <div className="col-md-12"><label className="labels">Price</label><input type="text" className="form-control" placeholder="enter price" name= "price" value={product_info.price} onChange={handleChange} required/></div>
                            <div className="col-md-12"><label className="labels">Image_link</label><input type="file" className="form-control" placeholder="enter imagelink" name= "imagelink" accept="image/*" onChange={handleChange} required/></div>
                            <div className="col-md-12"><label className="labels">Category</label><input type="text" className="form-control" placeholder="enter Category" name= "Category" value={product_info.Category} onChange={handleChange} required/></div>
                        </div>
                        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={handleSubmit}>Post Product</button></div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center experience">
                            <span>Your Products</span>
                            <ul>
                                {recentUser.products.map((product:ProductInfo, index:number) => (
                                <li key={index}>
                                    {product.productId}
                                </li>
                                ))}
                            </ul></div>
                    </div>
                </div>
             </div>
        </div>
    )

}

export default PostAProduct