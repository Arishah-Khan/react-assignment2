import React, { useState, useEffect } from 'react';
import { GoSun } from "react-icons/go";
import { FaMoon } from "react-icons/fa";

function ThemeToggle({ isDarkMode, changeTheme }) {
    return (
        <div className="absolute top-4 right-4">
            <label className="cursor-pointer">
                <input
                    onClick={changeTheme}
                    className="hidden"
                    type="checkbox"
                />
                {isDarkMode ? (
                    <FaMoon size={30} />
                ) : (
                    <GoSun size={30} />
                )}
            </label>
        </div>
    );
}

function ProductCard() {
    const [data, setData] = useState([]);
    const [isDarkMode, setDarkMode] = useState(false); 

    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            setData(data);
        };
        fetchData();
    }, []);

    // Toggle the theme mode
    function changeTheme() {
        setDarkMode(!isDarkMode);
    }

    return (
        <div
            className={`transition-all duration-500 ${
                isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
            }`}
        >
          
            <ThemeToggle isDarkMode={isDarkMode} changeTheme={changeTheme} />

            <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4">Welcome to ShopEasy</h1>
                    <p className="text-sm md:text-lg">Explore the best products at unbeatable prices!</p>
                </div>
            </header>

            {/* Products Section */}
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold text-center mb-6">Our Top Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-2 md:mx-4">
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full justify-center items-center gap-2 transform hover:scale-105 transition duration-300"
                        >
                            <div className="h-40 flex items-center justify-center bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-base font-semibold text-center mb-2">{item.title}</h3>
                                <p className="text-gray-700 text-xs text-center flex-grow">
                                    {item.description.substring(0, 100)}...
                                </p>
                                <button className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded hover:from-indigo-600 hover:to-blue-500 transition">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
