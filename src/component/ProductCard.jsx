import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col h-full transform hover:scale-105 transition duration-300">
      <div className="h-48 p-4 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-semibold mb-2 text-gray-800 dark:text-white line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow line-clamp-3">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">${product.price.toFixed(2)}</span>
          <div className="flex space-x-2">
            <Link
              to={`/product/${product.id}`}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-1 px-3 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Details
            </Link>
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-1 px-3 rounded text-sm hover:from-indigo-600 hover:to-blue-500 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
