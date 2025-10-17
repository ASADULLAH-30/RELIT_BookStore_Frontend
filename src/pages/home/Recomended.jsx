import React from 'react';
import BookCard from '../book/BookCard';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// RTK Query import
import { useFetchAllBooksQuery } from '../../redux/features/book/bookApi'; // ✅ check your folder path

const Recommended = () => {
  const { data: books = [], isLoading, error } = useFetchAllBooksQuery();

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6 py-2.5">
        Recommended for you
      </h2>

      {/* Loading/Error States */}
      {isLoading && <p>Loading books...</p>}
      {error && <p className="text-red-500">Error loading books.</p>}

      {/* Show Swiper only if books exist */}
      {books.length > 0 && (
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
          {books.slice(8, 16).map((book, index) => (
            <SwiperSlide key={book._id ?? index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {books.length === 0 && !isLoading && !error && (
        <p className="text-gray-500">No books available.</p>
      )}
    </div>
  );
};

export default Recommended;
 