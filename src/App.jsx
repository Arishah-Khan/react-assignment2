import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import Navbar from "./component/Navbar"
import Footer from "./component/Footer"
import HomePage from "./component/HomePage"
import ProductsPage from "./ProductPage/ProductPage"
import ProductDetailPage from "./productDetail/ProductDetail"
import CartPage from "./cart/cart"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>

            <ToastContainer />

    </Provider>
  )
}

export default App
