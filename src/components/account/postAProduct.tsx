import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductInfo } from "../../models/models";
import NavBar from "../../common/navbar";
import { baseUrl, postRequestOptions } from "../../common/cookie";
import axios from "axios";

function PostAProduct({ data }: any) {
  const navigate = useNavigate();

  const [recentUser, setRecentUser] = useState(
    data || {
      username: "",
      email: "",
      profile_image_link: "",
      products: [],
    }
  );



  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    try {
      let auth: any = await axios.post(baseUrl + "add-product", formData, postRequestOptions);
      if (auth.data.status == 200) {
     
        window.location.href = "/";
      } else {
        console.log(auth.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
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
              <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Product Name</label>
                    <input type="text" className="form-control" placeholder="enter product name" name="title" required />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Description</label>
                    <input type="text" className="form-control" placeholder="enter discription" name="description" required />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Price</label>
                    <input type="text" className="form-control" placeholder="enter price" name="price" required />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Image_link</label>
                    <input type="text" className="form-control" placeholder="enter imagelink" name="image_link" accept="image/*" required />
                  </div>

                  <div className="col-md-12">
                    <label className="labels">Category</label>
                    <select className="form-control" name="category" required>
                      <option value={"tshirts"}>T shirts</option>
                      <option value={"gadgets"}>Gadgets</option>

                      <option value={"bracelets"}>Bracelets</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button className="btn btn-primary " type="submit">
                    Post Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostAProduct;
