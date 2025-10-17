import React, { useState } from 'react';
import BookCard from '../book/BookCard';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// RTK Query hook
import { useFetchAllBooksQuery } from '../../redux/features/book/bookApi'; // adjust path

// ✅ Your static categories array
const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const Topsells = () => {
  // --- RTK Query hook ---
  const { data: books = [], isLoading, error } = useFetchAllBooksQuery();

  // --- local state for category selection ---
  const [selectedCategory, setSelectedCategory] = useState('Choose a genre');

  // --- filter logic ---
  const filteredBooks =
    selectedCategory === 'Choose a genre'
      ? books
      : books.filter(
          (book) =>
            book.category &&
            book.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // --- loading & error states ---
  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error loading books.</p>;

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>

      {/* Category dropdown */}
      <div className="mb-8 flex items-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Swiper slider */}
      {filteredBooks.length === 0 ? (
        <p className="text-red-500">No books found in this category.</p>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 2, spaceBetween: 50 },
            1180: { slidesPerView: 4, spaceBetween: 50 },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {filteredBooks.map((book, index) => (
            <SwiperSlide key={book._id ?? index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Topsells;
