
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice"
import { FaTrash, FaArrowLeft } from "react-icons/fa"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"



const CartPage = () => {
    const navigate = useNavigate();

  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

const handleRemoveItem = (id) => {
  dispatch(removeFromCart(id))
  toast.info("Item removed from cart")
}

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }))
    }
  }

const handleClearCart = () => {
  dispatch(clearCart())
  toast.warn("Cart cleared")
}


  const handleCheckout = () => {
      toast.success("Proceeding to checkout");
       navigate("/");

  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 10
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
        <div className="mx-auto px-4 ">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Your Cart</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/products"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-6 rounded-md hover:from-indigo-600 hover:to-blue-500 transition inline-flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="mx-auto px-4 max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Your Cart</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between">
            <span className="font-medium text-gray-800 dark:text-white">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </span>
            <button onClick={handleClearCart} className="text-red-500 hover:text-red-700 text-sm font-medium">
              Clear Cart
            </button>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {cartItems.map((item) => (
              <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row">
                <div className="sm:w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden mb-4 sm:mb-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="sm:ml-6 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-800 dark:text-white">
                        <Link to={`/product/${item.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)} each</p>
                    </div>
                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="text-gray-500 dark:text-gray-400 focus:outline-none w-8 h-8 rounded-md border border-gray-300 dark:border-gray-700 flex items-center justify-center"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2 w-8 text-center text-gray-800 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="text-gray-500 dark:text-gray-400 focus:outline-none w-8 h-8 rounded-md border border-gray-300 dark:border-gray-700 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-medium text-gray-800 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-900">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-medium text-gray-800 dark:text-white">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button               onClick={handleCheckout}
 className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-indigo-600 hover:to-blue-500 transition">
                Proceed to Checkout
              </button>
              <Link
                to="/products"
                className="w-full block text-center border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
