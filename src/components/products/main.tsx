import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import { Wrapper } from "../App.styles";
import Item from "../Item/item";
import NavBar from "../../common/navbar";
import { CartItemType, ProductInfo } from "../../models/models";
import { baseUrl, getRequestOptions, handleAuth } from "../../common/cookie";

const MainPage = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    // Attempt to get the cart items from localStorage
    const storedCartItems = localStorage.getItem("cartItems");

    // If items exist in storage, parse them, otherwise default to an empty array
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  let [products, setProducts] = useState([]);
  let [fitleredProducts, setFilteredProducts] = useState([]);

  let url = baseUrl + "products";

  useEffect(() => {
    fetch(url, getRequestOptions)
      .then((res) => {
        handleAuth(res.status);
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      });
  }, []);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      //1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item["_id"] === clickedItem["_id"]);
      let newCartItems;

      if (isItemInCart) {
        // If it is, increment the amount
        newCartItems = prev.map((item) => (item["_id"] === clickedItem["_id"] ? { ...item, amount: item.amount + 1 } : item));
      } else {
        // If not, add the new item to the cart
        newCartItems = [...prev, { ...clickedItem, amount: 1 }];
      }

      // Save the updated cart items to localStorage
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));

      // Return the new cart items to update the state
      return newCartItems;
    });
  };

  function filterProducts(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    // Filter the products array
    const filteredProducts: any = products.filter((product: any) => {
      return product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm);
    });

   
    setFilteredProducts(filteredProducts);
  }
  return (
    <Wrapper>
      <NavBar handleAddToCart={handleAddToCart} cartItems={cartItems} setCartItems={setCartItems} />
      <div className="col-4 search-container">
          <input
            className="form-control mr-sm-2 filter-trades-search-bar"
            type="search"
            placeholder="Search Trade By BB Ticker or ISIN"
            aria-label="Search"
            onChange={(event) => {
              filterProducts(event);
            }}
          />
        </div>
      <Grid container spacing={2} className="products-container">
        {fitleredProducts?.map((item: ProductInfo) => (
          <Grid item key={item["_id"]} xs={12} sm={4}>
            <Item
              item={{
                ...item,
                reviews: item.reviews || [], // add default value if reviews is not available
                amount: item.price || 0, // add default value if amount is not available
              }}
              handleAddToCart={handleAddToCart}
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default MainPage;
