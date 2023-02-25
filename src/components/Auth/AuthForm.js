import { useContext, useRef, useState } from "react";
import AuthContext from "../../store/Auth-context";

import classes from "./AuthForm.module.css";
import { toast } from "react-hot-toast";

const AuthForm = () => {
  const inputRef = useRef();
  const passRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const ctx = useContext(AuthContext);

  const switchAuthModeHandler = (event) => {
    event.preventDefault();
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = inputRef.current.value;
    const enteredPassword = passRef.current.value;
    // we can add validation
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGz5QikFOeMtHnshKMec9axx0AveQRnqs";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGz5QikFOeMtHnshKMec9axx0AveQRnqs";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json", //auth REST API knows that we got some JSON data coming in here
      },
    })
      .then(async (response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          const signupData = await response.json();
          console.log(signupData.error.message);
          throw new Error(signupData.error.message);
        }
      })
      .then((loginData) => {
        console.log(loginData);
        ctx.login(loginData.idToken);
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={inputRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passRef} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          <button onClick={submitHandler} type="button">
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="text"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin
              ? "don't Have an account? Sign up Here..."
              : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
