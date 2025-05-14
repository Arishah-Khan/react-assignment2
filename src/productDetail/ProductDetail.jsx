
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/cartSlice"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

const ProductDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
        }),
      )
    }
  }

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0) {
      setQuantity(value)
    }
  }

  // Generate rating display
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Product not found</h2>
        <Link to="/products" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="mx-auto px-4">
        <div className="mb-6">
          <Link to="/products" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            ← Back to Products
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              <img src={product.image || "/placeholder.svg"} alt={product.title} className="max-h-80 object-contain" />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="uppercase text-sm text-blue-600 dark:text-blue-400 font-semibold tracking-wide">
                {product.category}
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-2 mb-4">{product.title}</h1>

              <div className="flex items-center mb-4">
                {product.rating && (
                  <>
                    {renderRatingStars(product.rating.rate)}
                    <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">
                      {product.rating.rate} ({product.rating.count} reviews)
                    </span>
                  </>
                )}
              </div>

              <div className="text-2xl font-bold text-gray-800 dark:text-white mb-6">${product.price.toFixed(2)}</div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  />
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-6 rounded-md hover:from-indigo-600 hover:to-blue-500 transition"
                >
                  Add to Cart
                </button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-2">• Free shipping on orders over $50</p>
                  <p className="mb-2">• 30-day easy returns</p>
                  <p>• 1 year warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
