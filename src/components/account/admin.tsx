import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductInfo } from "../../models/models";
import NavBar from "../../common/navbar";
import { baseUrl, getRequestOptions, handleAuth } from "../../common/cookie";

function AdminPage() {
  const navigate = useNavigate();
  let [user, setUser] = useState({
    username: "",
    email: "",
    address: "",
    profile_image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg",
    products: [],
  });
  let [admin, setAdmin] = useState(false);
  let url = baseUrl + "user";
  useEffect(() => {
    fetch(url, getRequestOptions)
      .then((res) => {
        handleAuth(res.status);
        return res.json();
      })
      .then((data) => {
        setUser(data);
        if (data.account_type == "admin") {
          setAdmin(true);
        }
      });
  }, []);

  const products: any = [
    {
      _id: "P1001",
      description: "Compact digital camera with 20x zoom, shoots 4K video.",
      price: 299.99,
      review: ["Great camera for the price!", "Compact and easy to use."],
      average_review_rate: 4.5,
      image_link: "https://media.wired.com/photos/593261cab8eb31692072f129/master/pass/85120553.jpg",
    },
    {
      _id: "P1002",
      description: "Wireless noise cancelling headphones with 30-hour battery life.",
      price: 199.99,
      review: ["Superb sound quality", "Very comfortable"],
      average_review_rate: 4.7,
      image_link: "https://d1jyxxz9imt9yb.cloudfront.net/animal/804/meta_image/regular/WR202206_GiraffeTranslocation_012_360559_reduced.jpg",
    },
    {
      _id: "P1003",
      description: "Smartphone with 6.5-inch screen and 128GB storage.",
      price: 499.99,
      review: ["Sleek design, responsive UI", "Camera quality is top-notch"],
      average_review_rate: 4.3,
      image_link: "https://www.worldanimalprotection.org/cdn-cgi/image/width=1920,format=auto/globalassets/images/elephants/1033551-elephant.jpg",
    },
    {
      _id: "P1004",
      description: "Smartwatch with heart rate and sleep monitor features.",
      price: 149.99,
      review: ["A must-have for fitness enthusiasts", "Battery life could be better"],
      average_review_rate: 4.1,
      image_link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_L0D0VfZ-RjzNSAe8E1sngBoPHsqdgdzXWLDHMu3Wg&s",
    },
    {
      _id: "P1005",
      description: "Bluetooth speaker with 360-degree sound and IP67 water resistance.",
      price: 129.99,
      review: ["Perfect for outdoor parties", "Loud and clear sound"],
      average_review_rate: 4.8,
      image_link: "https://www.timeforkids.com/wp-content/uploads/2023/11/G3G5_231117_bear_steps.jpg?w=1024",
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5" width="150px" src={user.profile_image_link} />
            </div>
          </div>
          <div className="col-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile</h4>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Username</label>
                  <div>{user.username}</div>
                </div>
                <div className="col-md-12">
                  <label className="labels">Email</label>
                  <div>{user.email}</div>
                </div>
                <div className="col-md-12">
                  <label className="labels">Address</label>
                  <div>{user.address}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 border-right button_po">
            <button onClick={() => navigate("/PostAProduct", { state: { user } })} className="btn btn-primary btn-custom">
              Post A Product
            </button>
            <br />
            {admin ? (
              <button onClick={() => navigate("/DeleteUser")} className=" btn btn-secondary btn-custom">
                View Other Users
              </button>
            ) : (
              <></>
            )}
          </div>
          <div>
            <div>
              <div>
                <h1 className="analytics-title">Your Products</h1>
              </div>
              <br />
              <div id="carouselExample" className="carousel carousel-dark slide  carousel-custom">
                <div className="carousel-inner">
                  {products.map((product: ProductInfo, index: number) => (
                    <div className={`carousel-item ${index === 0 ? "active " : ""} row carousel-container`} key={product["_id"]}>
                      <img src={product.image_link} className="d-block img-carousel" alt="..." />

                      <p>Description: {product.description}</p>
                      <p>Price: {product.price}</p>
                      <p>
                        Average Review Rate: <b>{product.average_review_rate}</b>
                      </p>
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
    </div>
  );
}

export default AdminPage;
