import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../redux/actions/auth.actions"; // adjust path if needed

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth); // adjust based on your store shape

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative ml-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <img
          className="w-8 h-8 rounded-full"
          src={user?.avatar || "/images/user.png"} // fallback image
          alt="User profile"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {user?.nom }
        </span>

        <svg
          className={`ml-1 w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Your Profile
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
