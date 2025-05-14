
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import ProductCard from "../component/ProductCard"

const ProductsPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const categoryParam = queryParams.get("category")

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all")
  const [sortBy, setSortBy] = useState("default")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories")
        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }
        const data = await response.json()
        setCategories(data)
      } catch (err) {
        console.error("Error fetching categories:", err)
      }
    }

    fetchCategories()
  }, [])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        let url = "https://fakestoreapi.com/products"
        if (selectedCategory && selectedCategory !== "all") {
          url = `https://fakestoreapi.com/products/category/${selectedCategory}`
        }

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory])

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low-high") {
      return a.price - b.price
    } else if (sortBy === "price-high-low") {
      return b.price - a.price
    } else if (sortBy === "name-a-z") {
      return a.title.localeCompare(b.title)
    } else if (sortBy === "name-z-a") {
      return b.title.localeCompare(a.title)
    }
    return 0
  })

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">All Products</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full md:w-1/2 lg:w-1/4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">Failed to load products. Please try again later.</div>
        ) : (
          <>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{sortedProducts.length} products found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
