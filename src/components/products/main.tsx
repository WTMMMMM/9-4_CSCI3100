import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";


//For those drawers
//For those icons
import { IconButton } from "@material-ui/core";
//Social Media Icons

//mui styles
import { makeStyles } from "@material-ui/core/styles";
import Cart from "../Cart/Cart";
import { StyledButton, Wrapper } from "../App.styles";
import Item from "../Item/item";
import { CartIcon } from "../../common/functions";
// import Icon from "../img/logo.png"
//logo

//Types
export type CartItemType = {
  
    productId: string;
    description: string;
    price: number;
    reviews: string[];
    average_review_rate: number;
    image_link: string;
    //myAdd
    amount: number;
    title: string;
};


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

const MainPage = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]); //[] is empty array of CartItemType
    const [openDialog, setOpenDialog] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    //reward point
    const [rewardPoint, setRewardPoint] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    // const { data, isLoading, error } = useQuery<CartItemType[]>("products", getProducts);
    let data = [
        {
            productId: "1",

            description: "Big and red",
            price: 20,
            reviews: ["This is good", "sadasd"],
            average_review_rate: 2,
            image_link: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            //myAdd
            title: "T-shirt-A",
            amount: 0,
        },
        {
            productId: "2",
            description: "Small and blue",
            price: 30,
            reviews: ["This is bad", "sadasd"],
            average_review_rate: 3,
            image_link: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
            //myADd
            title: "T-shirt-B",
            amount: 0,
        },
        {
            productId: "3",
            description: "Ugly and yellow",
            price: 20,
            reviews: ["Don't study CS", "fucked"],
            average_review_rate: 5,
            image_link: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
            //myAdd
            title: "T-shirt-C",
            amount: 0,
        },
    ];
    console.log(data);

    //mui styles
    const classes = useStyles();

    const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, item) => acc + item.amount, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems((prev) => {
            //1. Is the item already added in the cart?
            const isItemInCart = prev.find((item) => item.productId === clickedItem.productId);
            if (isItemInCart) {
                return prev.map((item) =>
                    item.productId === clickedItem.productId
                        ? { ...item, amount: item.amount + 1 } //... means keep the rest of the properties same
                        : item
                );
            }
            //First time the item is added
            return [...prev, { ...clickedItem, amount: 1 }];
        });
    };

    const handleRemoveFromCart = (id: string) => {
        setCartItems((prev) =>
            prev.reduce((acc, item) => {
                if (item.productId === id) {
                    if (item.amount === 1) return acc;
                    return [...acc, { ...item, amount: item.amount - 1 }];
                } else {
                    return [...acc, item];
                }
            }, [] as CartItemType[])
        );
    };

    const [category, setCategory] = useState("");

    // if (isLoading) return <LinearProgress />;
    // if (error) return <div>Something went wrong...</div>;

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategory(event.target.value as string);
    };

    return (
        <Wrapper>
            {/* This the header section */}
            {/* Boostrap */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <img src={"http://localhost:3000/img/logo.png"} alt="Logo" style={{ width: "100px", height: "100px" }} />
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav d-flex justify-content-between w-100">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">
                                Home <span className="sr-only"></span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                T-shirt
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">
                                Bracelets
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="">
                                Gadgets

                            </a>
                        </li>
                        <li className="nav-item">
                            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)} classes={{ paper: classes.drawerPaper }}>
                                <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={(id: string) => handleRemoveFromCart(id)} />
                            </Drawer>
                            <StyledButton onClick={() => setCartOpen(true)}>
                                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                                    <CartIcon />
                                </Badge>
                            </StyledButton>
                        </li>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                            Search
                        </button>
                    </ul>
                </div>
            </nav>

            <Grid container spacing={2}>
                {data?.map((item) => (
                    <Grid item key={item.productId} xs={12} sm={4}>
                        <Item
                            item={{
                                ...item,
                                reviews: item.reviews || [], // add default value if reviews is not available
                                amount: item.amount || 0, // add default value if amount is not available
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
