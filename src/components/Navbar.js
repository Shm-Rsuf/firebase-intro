import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar flex justify-between items-center container mx-auto py-5 border-b">
      <Link to="/" className="font-medium capitalize text-orange-500">
        firebase killer
      </Link>
      <ul className="links flex gap-10">
        <li>
          <Link to="/" className="hover:text-orange-500 duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-orange-500 duration-300">
            About
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-orange-500 duration-300">
            Profile
          </Link>
        </li>
        <li>
          <Link
            to={`/${user.email ? "profile" : "login"}`}
            className="hover:text-orange-500 duration-300"
          >
            {user.email ? `Welcome, ${user.displayName}` : "Login"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
