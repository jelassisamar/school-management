import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-64 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
          </div>
          <div className="py-1 overflow-auto max-h-96">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`https://i.pravatar.cc/150?img=${item}`}
                      alt="Notification"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      New notification {item}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">2 hours ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-600">
            <Link
              to="/notifications"
              className="block text-sm font-medium text-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;