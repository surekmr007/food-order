import { useContext } from "react";
import { toast } from "react-hot-toast";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      url: props.url,
      name: props.name,
      amount: amount,
      price: props.price,
    });
    toast.success(`${amount} ${props.name} was added `);
  };

  return (
    <li className={classes.meal}>
      <div>
        <div className={classes.container}>
          <img
            className={classes.image}
            width={250}
            height={250}
            src={props.url}
            alt={props.name + "_pic"}
          />
          <div className={classes.details}>
            <h3>{props.name}</h3>
            <div className={classes.price}>₹{price}</div>
          </div>
        </div>
      </div>
      <div className={classes.description}>{props.description}</div>

      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
