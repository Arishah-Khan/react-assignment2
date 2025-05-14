import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
          Shop<span className="text-pink-500">Easy</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-pink-400 font-medium">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-pink-400 font-medium">
            Products
          </Link>
          <Link to="/cart" className="relative text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-pink-400">
            <FaShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 dark:text-gray-200 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900 shadow">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-pink-400">
            Home
          </Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-pink-400">
            Products
          </Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-pink-400">
            Cart ({totalItems})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
