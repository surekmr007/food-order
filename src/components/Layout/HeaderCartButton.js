import React, { useContext } from "react";

import { AiOutlineShoppingCart } from "react-icons/ai";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  return (
    <React.Fragment>
      <button className={classes.container} onClick={props.onClick}>
        <span className={classes.icon}>
          <AiOutlineShoppingCart />
          <span className={classes.badge}>{numberOfCartItems}</span>
        </span>
      </button>
    </React.Fragment>
  );
};

export default HeaderCartButton;
