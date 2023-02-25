import { Fragment } from "react";
import { useContext } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import AuthContext from "../../store/Auth-context";
import { AiOutlineLogout } from "react-icons/ai";
const Header = (props) => {
  const ctx = useContext(AuthContext);
  const isLoggedIn = ctx.isLoggedIn;

  const logoutHandler = () => {
    ctx.logout();
  };
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <nav className={classes.nav}>
          <HeaderCartButton onClick={props.onShowCart} />
          {isLoggedIn && (
            <button className={classes.button}>
              <AiOutlineLogout onClick={logoutHandler} />
              <span className={classes.logout}>Logout</span>
            </button>
          )}
        </nav>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
