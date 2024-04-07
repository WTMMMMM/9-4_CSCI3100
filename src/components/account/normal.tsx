import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { ProductInfo } from "../../models/models";

function NormalPage() {

    const navigate = useNavigate();

    const [normal_info, setnormal_info] = useState({
        username: '',
        email: '',
        adress: '',
        profile_image_link: '',
        products: [],
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setnormal_info({ ...normal_info, [name]: value });
    };

    useEffect(() => {
        fetch('api')
          .then(res => res.json())
          .then(data => {
            setnormal_info(data);
          })
          .catch(error => console.error('Error fetching events:', error));
      }, []);

    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="150px" src={normal_info.profile_image_link} />
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile</h4>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Username</label><div>{normal_info.username}</div></div>
                            <div className="col-md-12"><label className="labels">Email</label><div>{normal_info.email}</div></div>
                            <div className="col-md-12"><label className="labels">Address</label><div>{normal_info.adress}</div></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center experience">
                            <span>Your Products</span>
                            <ul>
                                {normal_info.products.map((product:ProductInfo, index:number) => (
                                <li key={index}>
                                    {product.productId}
                                </li>
                                ))}
                            </ul>
                        </div><br />
                        <button onClick={() => navigate('/PostAProduct', { state: { normal_info} })}>Post A Product</button>
                        <div className="d-flex justify-content-between align-items-center experience"><span>Your Purchase Record</span></div><br />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NormalPage
