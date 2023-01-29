import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../firebase/firebase.init";

const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();

  //google login system
  const handleGoogleLogin = () => {
    signInWithPopup(auth, providerGoogle)
      .then((data) => {
        console.log(data.user);
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
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
      </div>
    </div>
  );
};

export default Login;