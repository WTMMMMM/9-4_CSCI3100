import { Badge, Drawer, makeStyles } from "@material-ui/core";
import { baseUrl, checkAuth } from "./cookie";
import React, { useState } from "react";
import Cart from "../components/Cart/Cart";
import { StyledButton } from "../components/App.styles";
import { AddShoppingCart } from "@mui/icons-material";
import { CartItemType } from "../models/models";
function NavBar(props: any) {
  checkAuth();
  function handleLogOut(event: any) {
    document.cookie = "skyshoppes.cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    window.location.href = "/login";
  }
  const [cartOpen, setCartOpen] = useState(false);
  let localStorageItems = () => {
    // Attempt to get the cart items from localStorage
    const storedCartItems = localStorage.getItem("cartItems");

    // If items exist in storage, parse them, otherwise default to an empty array
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  };
  let cartItems = props.cartItems || localStorageItems();

  const useStyles = makeStyles({
    drawerPaper: {
      width: "500px", // Set the width of the drawer
      overflowX: "hidden", // Hide horizontal scroll
      borderRadius: "15px",
    },

    select: {
      "& .MuiSelect-root": {
        borderRadius: "15px",
      },
    },

    dialog: {
      borderRadius: "15px",
      border: "1px solid #FF4500",
    },

    textField: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "15px",
      },
    },

    item: {
      borderRadius: "15px",
    },

    menuItem: {
      "& .MuiMenuItem-root": {
        borderRadius: "15px",
      },
    },

    iconButtonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "100px",
    },

    headerSection: {
      position: "sticky",
      justifyContent: "center",
      top: 0,
      zIndex: 100,
      backgroundColor: "#efefef",
      marginBottom: "50px",
    },
  });
  const classes: any = useStyles();

  const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, item) => acc + item.amount, 0);

  const handleRemoveFromCart = (id: string) => {
    props.setCartItems((prev: any) => {
      // Reduce the cart items, decrementing or removing items as needed
      const updatedItems = prev.reduce((acc: any, item: any) => {
        if (item._id === id) {
          if (item.amount === 1) return acc; // remove the item from cart
          return [...acc, { ...item, amount: item.amount - 1 }]; // decrement item amount
        } else {
          return [...acc, item]; // keep the item as is
        }
      }, [] as CartItemType[]);

      // Save the updated cart items to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      // Return the updated items to update the state
      return updatedItems;
    });
  };
  function navigate(event: any, page: string) {
    window.location.href = page;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg  navbar-custom">
        <div className="container-fluid">
          <a href="/">
            <img src={"/img/logo.png"} className="header-logo" alt="logo-triada" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 header-items">
              <li className="nav-item dropdown">
                <a className="nav-link active header-item" onClick={(event: any) => navigate(event, "/")} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Products
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link active header-item" onClick={(event: any) => navigate(event, "/analytics")} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Analytics
                </a>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link active header-item" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Account
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" aria-current="page" onClick={(event: any) => navigate(event, "/profile")}>
                      Profile
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" aria-current="page" onClick={(event) => handleLogOut(event)}>
                      Log Out
                    </button>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)} classes={{ paper: classes.drawerPaper }}>
                  <Cart cartItems={cartItems} addToCart={props.handleAddToCart} removeFromCart={(id: string) => handleRemoveFromCart(id)} />
                </Drawer>
                <StyledButton onClick={() => setCartOpen(true)}>
                  <Badge badgeContent={getTotalItems(cartItems)} color="error">
                    <AddShoppingCart />
                  </Badge>
                </StyledButton>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default NavBar;
