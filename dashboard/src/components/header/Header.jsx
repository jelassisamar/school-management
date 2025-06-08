import { useState } from "react";
import { Link } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between w-full h-16 px-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center">
          <button
            onClick={handleSidebarToggle}
            className="p-2 mr-2 text-gray-500 rounded-md hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
            MonLycee
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </header>

      {/* Sidebar */}
      <AppSidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Your main content goes here */}
      </main>
    </>
  );
};

export default Header;
