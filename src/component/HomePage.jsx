import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products?limit=8");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Welcome to <span className="text-yellow-300">ShopEasy</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10">
            Discover premium products at amazing prices.
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-300 text-indigo-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300"
          >
            🛒 Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              View All →
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 text-lg py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {["electronics", "jewelery", "men's clothing", "women's clothing"].map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all p-6 text-center"
              >
                <div className="text-gray-800 dark:text-white font-semibold capitalize text-lg">
                  {category}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
