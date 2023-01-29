import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser("");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="profile container mx-auto py-10">
      <h2 className="section-title text-center text-2xl text-gray-500 mb-10">
        Profile
      </h2>

      {user.email && (
        <div className="profile-card flex flex-col items-center gap-2">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={user.photoURL}
            alt={user.displayName}
          />
          <h3 className="text-3xl">{user.displayName}</h3>
          <p>Email: {user.email}</p>
          <p>Id: {user.uid}</p>

          <button
            onClick={handleSignOut}
            className="sign-out bg-gray-700 text-white h-12 w-44 mt-3 capitalize font-medium rounded-md hover:bg-orange-500 duration-300 tracking-wider"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
