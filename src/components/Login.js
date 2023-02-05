import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import app from "../firebase/firebase.init";

const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();
const providerFacebook = new FacebookAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //google login system
  const handleGoogleLogin = () => {
    signInWithPopup(auth, providerGoogle)
      .then((data) => {
        // console.log(data.user);
        navigate("/profile");
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  //github login system
  const handleGithubLogin = () => {
    signInWithPopup(auth, providerGithub)
      .then((data) => {
        // console.log(data.user);
        navigate("/profile");
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  //facebook login system
  const handleFacebookLogin = () => {
    signInWithPopup(auth, providerFacebook)
      .then((data) => {
        // console.log(data.user);
        navigate("/profile");
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  //regular login system
  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });

    //reset email and password
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login container mx-auto py-10">
      <h2 className="section-title text-center text-2xl text-gray-500 mb-10">
        Login
      </h2>

      <div className="login-platforms flex flex-col items-center gap-5">
        <button
          onClick={handleGoogleLogin}
          className="google-sign-in bg-gray-700 text-white h-12 w-64 capitalize font-medium rounded-md hover:bg-orange-500 duration-300 tracking-wider"
        >
          login with google
        </button>

        <button
          onClick={handleGithubLogin}
          className="google-sign-in bg-gray-700 text-white h-12 w-64 capitalize font-medium rounded-md hover:bg-orange-500 duration-300 tracking-wider"
        >
          login with GitHub
        </button>
        <button
          onClick={handleFacebookLogin}
          className="google-sign-in bg-gray-700 text-white h-12 w-64 capitalize font-medium rounded-md hover:bg-orange-500 duration-300 tracking-wider"
        >
          login with Facebook
        </button>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-3 items-start mt-5"
        >
          <div className="form-control flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
              placeholder="Enter your email"
              required
              className="border py-2 px-5 rounded-md w-[20rem]"
            />
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className="border py-2 px-5 rounded-md w-[20rem]"
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="bg-sky-500 w-full py-2 uppercase tracking-widest rounded-md text-white cursor-pointer hover:bg-sky-700 duration-300 mt-3"
          />
          <p>
            Don't have an accoutn?{" "}
            <Link to="/register" className="text-sky-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
