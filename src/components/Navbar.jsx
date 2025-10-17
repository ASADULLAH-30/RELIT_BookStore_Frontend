// Importing necessary libraries and components
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation between pages
import { RiBarChartHorizontalLine } from "react-icons/ri"; // Icon for menu/dashboard
import { IoSearchOutline } from "react-icons/io5"; // Search icon
import { FaUserLarge, FaOpencart } from "react-icons/fa6"; // User and Cart icons
import { CiHeart } from "react-icons/ci"; // Wishlist (heart) icon
import { Menu, MenuItem } from '@mui/material'; // Material UI Menu components
import avatar from '../assets/avatar1.png'; // Default avatar image
import { useSelector } from 'react-redux'; // To access Redux store
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext'; // Custom auth context for login/logout

// Navigation links for dropdown menu
const navigation = [
  { name: "Dashboard", path: "/" },
  { name: "Orders", path: "/orders" },
  { name: "Cart", path: "/cart" },
  { name: "Checkout", path: "/checkout" },
];

function Navbar() {
  // State for menu anchor element (Material UI)
  const [anchorEl, setAnchorEl] = useState(null);

  // Access authentication context
  const { currentUser, logoutUser } = useAuth();

  // Get cart items from Redux state
  const cartitems = useSelector((state) => state.cart.cartitems);

  // Open dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await logoutUser();
      handleMenuClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    // Navbar container
    <header className="bg-gray-900 text-gray-100 sticky top-0 z-50 w-full border-b border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* ---------- Left Section ---------- */}
          <div className="flex items-center space-x-6">
           
            
            {/* Logo/Menu */}
            <Link to="/" className="flex items-center space-x-2">
              <RiBarChartHorizontalLine className="h-6 w-6 text-gray-300 hover:text-white transition-colors" />
              <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
              <span className="font-semibold text-lg hidden sm:inline-block">
                Reuse Literature
              </span>
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center bg-gray-800 rounded-sm px-3 py-1.5 
                            focus-within:bg-gray-700 focus-within:ring-1 focus-within:ring-gray-500 
                            transition-all duration-200 w-64">
              <IoSearchOutline className="h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search books..." 
                className="bg-transparent border-none focus:ring-0 ml-2 w-full text-gray-100 placeholder-gray-400" 
              />
            </div>
          </div>

          {/* ---------- Right Section ---------- */}
          <div className="flex items-center space-x-6">

            {/* User Menu / Avatar */}
            <div className="relative">
              {currentUser ? (
                <>
                  {/* If user is logged in, show avatar */}
                  <button 
                    onClick={handleMenuOpen} 
                    className="flex items-center space-x-1 focus:outline-none"
                  >
                    <img 
                       src={currentUser.photoURL || avatar}  
                      alt="User" 
                      className="h-8 w-8 rounded-sm border border-gray-600" 
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      style: {
                        backgroundColor: '#1f2937',
                        color: '#f3f4f6',
                        border: '1px solid #374151',
                        marginTop: '8px',
                        minWidth: '200px',
                      },
                    }}
                  >
                    {/* Navigation items */}
                    {navigation.map((item) => (
                      <MenuItem
                        key={item.name}
                        component={Link}
                        to={item.path}
                        onClick={handleMenuClose}
                        sx={{
                          '&:hover': { backgroundColor: '#374151' },
                          borderBottom: '1px solid #374151',
                          '&:last-child': { borderBottom: 'none' },
                        }}
                      >
                        {item.name}
                      </MenuItem>
                    ))}

                    {/* Logout Option */}
                    <MenuItem
                      onClick={handleLogout}
                      sx={{
                        '&:hover': { backgroundColor: '#374151' },
                        borderTop: '1px solid #374151',
                        color: 'red',
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                // If no user logged in, show login icon
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  <FaUserLarge className="h-5 w-5" />
                </Link>
              )}
            </div>

            {/* Wishlist button */}
            <button className="text-gray-300 hover:text-white transition-colors">
              <CiHeart className="h-6 w-6" />
            </button>

            {/* Cart button with badge */}
            <Link to="/cart" className="relative text-gray-300 hover:text-white transition-colors">
              <FaOpencart className="h-5 w-5" />
              {cartitems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-gray-900 
                                 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartitems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ---------- Mobile Search ---------- */}
        <div className="md:hidden py-3">
          <div className="flex items-center bg-gray-800 rounded-sm px-3 py-2 w-full border border-gray-700">
            <IoSearchOutline className="h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search books..." 
              className="bg-transparent border-none focus:ring-0 ml-2 w-full text-gray-100 placeholder-gray-400" 
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
