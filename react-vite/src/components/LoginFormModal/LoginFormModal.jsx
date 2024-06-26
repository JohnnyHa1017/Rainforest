import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkLogin } from "../../redux/session";
import { getAllUsersCartsThunk } from "../../redux/carts";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      await dispatch(getAllUsersCartsThunk());
      closeModal();
    }
  };

  const loginDemoUser = async () => {
    const demoUser = {
      email: "demo@aa.io",
      password: "password"
    };
    await dispatch(thunkLogin(demoUser));
    await dispatch(getAllUsersCartsThunk());
    closeModal();
  };

  return (
    <div className="login-form-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
        <button type="button" onClick={loginDemoUser}>Demo Login</button>
        <button className="google-button" onClick={() => window.location.href = `${window.origin}/api/auth/oauth_login`}>
          <img src="https://i.postimg.cc/kBCBGRS6/Google-removebg-preview.png" alt="Google Logo" />
          <span>Sign In with Google</span>
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
