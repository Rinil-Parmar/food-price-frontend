import { Link, useLocation } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Products", path: "/products" },
    { name: "Deals", path: "/deals" },
    { name: "Categories", isDropdown: true },
    { name: "About Us", path: "/about" },
  ];

  // Category sub-menu
  const categoryItems = [
    { name: "Fruits & Vegetables", path: "/categories/fruits" },
    { name: "Dairy", path: "/categories/dairy" },
    { name: "Snacks", path: "/categories/snacks" },
    { name: "Household Items", path: "/categories/household" },
  ];

  return (
    <header className="w-full bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-blue-700"
        >
          SmartGrocer
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) =>
            item.isDropdown ? (
              // ------------------------------
              // CATEGORY DROPDOWN
              // ------------------------------
              <Disclosure as="div" key="categories" className="relative">
                {({ open }) => (
                  <>
                    <DisclosureButton
                      className={`flex items-center space-x-1 font-medium transition ${
                        open || currentPath.includes("/categories")
                          ? "text-blue-700"
                          : "text-gray-700 hover:text-blue-700"
                      }`}
                    >
                      <span>Categories</span>
                      <ChevronDownIcon
                        className={`size-4 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </DisclosureButton>

                    <DisclosurePanel className="absolute mt-2 w-56 bg-white border shadow-lg rounded-lg p-2 space-y-1 z-50">
                      {categoryItems.map((cat) => (
                        <Link
                          key={cat.name}
                          to={cat.path}
                          className="block px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ) : (
              // ------------------------------
              // NORMAL NAV LINKS
              // ------------------------------
              <Link
                key={item.name}
                to={item.path ?? "/"}
                className={`font-medium transition ${
                  currentPath === item.path
                    ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                    : "text-gray-700 hover:text-blue-700"
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
