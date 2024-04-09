import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { ProductInfo } from "../../models/models";

function NormalPage() {

    const navigate = useNavigate();

    const [normal_info, setnormal_info] = useState({
        username: 'bruce',
        email: 'bruce@cuhk',
        adress: 'cuhk',
        profile_image_link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg',
        products: [],
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setnormal_info({ ...normal_info, [name]: value });
    };

    const products: any = [
        {
            productId: 'P1001',
            description: 'Compact digital camera with 20x zoom, shoots 4K video.',
            price: 299.99,
            review: ['Great camera for the price!', 'Compact and easy to use.'],
            average_review_rate: 4.5,
            image_link: 'https://media.wired.com/photos/593261cab8eb31692072f129/master/pass/85120553.jpg'
        },
    ];

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
                <div className="col-3 border-right button_po">
                    <button onClick={() => navigate('/PostAProduct', { state: { normal_info } })} className="btn btn-primary btn-custom">Post A Product</button><br />
                </div>
                <div >
                    <div>
                        <div >
                            <h1>Your Products</h1>
                            {/* <ul>
                                {normal_info.products.map((product:ProductInfo, index:number) => (
                                <li key={index}>
                                    {product.productId}
                                </li>
                                ))}
                            </ul> */}

                        </div><br />
                        <div id="carouselExample" className="carousel carousel-dark slide  carousel-custom">
                            <div className="carousel-inner">


                                {products.map((product: ProductInfo, index: number) => (
                                    <div className={`carousel-item ${index === 0 ? 'active ' : ''} row carousel-container`} key={product.productId}>
                                        <img src={product.image_link} className="d-block img-carousel" alt="..." />

                                        <p>Description: {product.description}</p>
                                        <p>Price: {product.price}</p>
                                        <p>Average Review Rate: <b>{product.average_review_rate}</b></p>



                                    </div>
                                ))}

                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NormalPage
