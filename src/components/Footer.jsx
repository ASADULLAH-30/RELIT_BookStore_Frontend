import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal
} from 'react-icons/fa';
import { Divider } from '@mui/material';

const footerLinks = [
  { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
  { title: "Help", links: ["Contact", "Shipping", "Returns", "FAQ"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
];

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-2">
            <h2 className="text-xl font-medium text-white mb-4">BOOK STORE</h2>
            <p className="text-gray-400 mb-6">
              Your one-stop shop for all your reading needs. Discover thousands of titles across all genres.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link 
                      to="#" 
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on new arrivals and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white text-sm px-3 py-2 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 w-full"
              />
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 text-sm font-medium transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Divider - MUI Component */}
        <Divider 
          sx={{ 
            backgroundColor: '#374151',
            marginBottom: '1.5rem'
          }} 
        />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-gray-400 text-sm">Accepted Payments:</span>
            <div className="flex space-x-2">
              <FaCcVisa className="h-6 w-6 text-gray-400" />
              <FaCcMastercard className="h-6 w-6 text-gray-400" />
              <FaCcPaypal className="h-6 w-6 text-gray-400" />
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Book Store. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;