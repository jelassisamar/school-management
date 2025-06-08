import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const AppSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const sidebarRef = useRef(null);

  const menuSections = [
    {
      title: "Administration",
      items: [
        { name: "Tableau de bord", icon: "📊", path: "/" },
        { name: "Élèves", icon: "👨‍🎓", path: "/eleves" },
        { name: "Parents", icon: "👩‍🏫", path: "/parents" },
        { name: "Classes", icon: "🏫", path: "/classes" },
      ],
    },
    {
      title: "Scolarité",
      items: [
        { name: "Matières", icon: "📚", path: "/matieres" },
        { name: "Emplois du temps", icon: "📅", path: "/emplois" },
        { name: "Resultats", icon: "📝", path: "/resultats" },
        { name: "Absences", icon: "❌", path: "/absences" },
      ],
    },
    {
      title: "Communication",
      items: [
        { name: "Messagerie", icon: "✉️", path: "/messagerie" },
        { name: "Rendez-vous", icon: "🤝", path: "/rendez-vous" },
       
      ],
    },
    {
      title: "Paramètres",
      items: [
        { name: "Comptes", icon: "👤", path: "/comptes" },
        { name: "Configuration", icon: "⚙️", path: "/configuration" },
      ],
    },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <aside
    ref={sidebarRef}
    className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      absolute`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Portail Scolaire</h1>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              aria-label="Fermer le menu"
            >
              ✖
            </button>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-6">
          {menuSections.map((section, index) => (
            <div key={index}>
              <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {section.title}
              </h3>
              <ul className="mt-2 space-y-1">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive(item.path)
                          ? "bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-white"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                      onClick={onClose}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
