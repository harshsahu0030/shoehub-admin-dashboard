import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../app/actions/userAction";

const Login = () => {
  //redux
  const dispatch = useDispatch();

  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //functtions
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(email, password));
  };

  return (
    <div className="login_container">
      <form className="wrapper" onSubmit={loginHandler}>
        <h1>
          LOGIN
          <hr />
        </h1>

        <div className="input_container">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input_container">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
