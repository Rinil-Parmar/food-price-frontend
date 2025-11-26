import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Products", path: "/products" },
    { name: "Deals", path: "/deals" },
    { name: "About Us", path: "/about" },
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
          {navItems.map((item) => (
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
          ))}
        </nav>
      </div>
    </header>
  );
}
