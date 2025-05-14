const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-6">
      <div className=" mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopEasy</h3>
            <p className="text-sm">Your one-stop shop for all your needs at unbeatable prices.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-blue-200 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-blue-200 transition">
                  Products
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-blue-200 transition">
                  Cart
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: contact@shopeasy.com</p>
            <p className="text-sm">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-blue-400 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ShopEasy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
