import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getimgurl } from '../../utils/getimgurl';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../redux/Features/cart/cartSlice';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addtoCart(product))  
  }
  return (
    <div className="w-full flex flex-wrap gap-2 max-w-[200px] bg-white rounded-md shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 flex flex-col">
      {/* Image Container - Compact */}
      <div className="relative pt-[120%] bg-gray-50 overflow-hidden">
        <Link 
          to={`/book/${book._id}`}
          className="absolute inset-0 flex items-center justify-center p-2"
        >
          <img
            src={`${getimgurl(book.coverImage)}`}
            alt={book.title}
            className="absolute h-full w-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Content Area - Compact */}
      <div className="p-2 flex flex-col flex-grow">
        {/* Title - Single line */}
        <Link to={`/book/${book._id}`}>
          <h3 className="font-medium text-gray-800 mb-1 line-clamp-1 hover:text-blue-600 transition-colors text-sm">
            {book.title}
          </h3>
        </Link>
        
        {/* Price - Compact */}
        <div className="mt-1">
          <p className="font-semibold text-sm">
            RS:{book?.newPrice} 
            {book?.oldPrice && (
              <span className="line-through text-gray-500 text-xs ml-1">
                RS:{book?.oldPrice}
              </span>
            )}
          </p>    
        </div>

        {/* Button - Compact */}
        <button 
        onClick={()=> handleAddToCart(book)}
        className="mt-2 w-full flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium transition-colors duration-200">
          <FiShoppingCart className="text-xs" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;