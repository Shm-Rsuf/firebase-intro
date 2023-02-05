import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

const Register = ({ setUser, user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    //sign up a new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result.user) {
          //update username
          updateUserProfile();
        }
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });

    //reset inputs
    setName("");
    setEmail("");
    setPassword("");
  };

  const updateUserProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: "https://randomuser.me/api/portraits/men/40.jpg",
    })
      .then(() => {
        console.log("profile updated");
        setUser({ ...user, displayName: name });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="register flex justify-center mt-10">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-3 items-start mt-5"
      >
        <div className="form-control flex flex-col gap-3">
          <label htmlFor="full-name">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="full-name"
            placeholder="Enter your full name"
            required
            className="border py-2 px-5 rounded-md w-[20rem]"
          />
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
          value="Register"
          className="bg-sky-500 w-[20rem] py-2 uppercase tracking-widest rounded-md text-white cursor-pointer hover:bg-sky-700 duration-300 mt-3"
        />
        <p>
          Already have an accoutn?{" "}
          <Link to="/login" className="text-sky-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
