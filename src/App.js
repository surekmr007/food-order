import { useState, useContext, Fragment } from "react";

import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import AvailableMeals from "./components/Meals/AvailableMeals";
import MealsSummary from "./components/Meals/MealsSummary";
import AuthForm from "./components/Auth/AuthForm";

import CartProvider from "./store/CartProvider";
import AuthContext from "./store/Auth-context";
import { Toaster } from "react-hot-toast";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const ctx = useContext(AuthContext);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Toaster />

      <main>
        {!ctx.isLoggedIn && (
          <Fragment>
            <MealsSummary />
            <AuthForm />
          </Fragment>
        )}
        {ctx.isLoggedIn && <AvailableMeals />}
      </main>
    </CartProvider>
  );
}

export default App;
