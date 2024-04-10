import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Wrapper } from "./item.styles";
import { Dialog, DialogContent, DialogTitle, Grid, Typography } from "@material-ui/core";
import { CartItemType } from "../../models/models";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import React from "react";

const useStyles = makeStyles({
  dialog: {
    borderRadius: "15px",
    // border: "5px solid black",
  },

  des_priceSection: {
    backgroundColor: "#e8f5e9",
    borderRadius: "15px",
    padding: " 10px 20px 10px 20px",
  },

  reviewSection: {
    backgroundColor: "#e8f5e9",
    borderRadius: "15px",
    padding: " 10px 20px 10px 20px",
  },
});

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <Wrapper>
      <Grid>
      <IconButton onClick={() => setLiked(!liked)}>{liked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}</IconButton>
        <div onClick={handleClickOpen}>
          <img src={item.image_link}  className="product-image"alt={item.title} />
          <div>
            <h3>{item.title}</h3>
            {/* <p>{item.description}</p> */}
            <h3>${item.price}</h3>
          </div>
        </div>
      </Grid>
      <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
      <div>
        <Dialog open={open} onClose={handleClose} PaperProps={{ className: classes.dialog }}>
          <DialogTitle>
            <Typography variant="h5" align="center">
              {item.title}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <img src={item.image_link} alt={item.title} style={{ width: "100%" }} />
            <div className={classes.des_priceSection}>
              <p>Description: {item.description}</p>
              <h3>${item.price}</h3>
            </div>
            <br />
            {/* Below is the reviewSection inside the PopUp */}
            <div className={classes.reviewSection}>
              <p>Review Section:</p>
              <p>
                {item.reviews.map((review: string, index: number) => {
                  return <p key={index}>{index + 1 + ". " + review}</p>;
                })}
              </p>
              <h3>Average Rating: {Math.round(item.average_review_rate * 10) / 10}</h3>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Wrapper>
  );
};

export default Item;
