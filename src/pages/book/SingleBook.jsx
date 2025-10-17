import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFetchBookByIdQuery } from '../../redux/features/book/bookApi';
import { addtoCart } from '../../redux/features/cart/cartSlice'; // ✅ adjust path as needed
import { FiShoppingCart } from 'react-icons/fi';
import { getimgurl } from '../../utils/getimgurl';

function SingleBook() {
  const { id } = useParams();
  const { data: book, isLoading, error } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading book details</div>;
  if (!book) return <div>No book found</div>;

  const handleToCart = (product) => {
    dispatch(addtoCart(product));
  };

  return (
    <div className="max-w-lg shadow-md p-5">
      <h1 className="text-2xl font-bold mb-6">{book?.title}</h1>

      <div>
        <div>
          <img
            src={getimgurl(book?.coverImage)}
            alt={book?.title}
            className="m-8"
          />
        </div>

        <div className="mb-5">
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong> {book?.author || 'Admin'}
          </p>

          <p className="text-gray-700 mb-4">
            <strong>Published:</strong>{' '}
            {book?.createdAt
              ? new Date(book.createdAt).toLocaleDateString()
              : 'Unknown'}
          </p>

          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {book?.category}
          </p>
        </div>

        <div>
          <button
            onClick={() => handleToCart(book)}
            className="bg-blue-600 text-white px-6 py-2 flex items-center gap-1 rounded-lg shadow-md hover:bg-blue-700"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
