import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const images = [
  "https://i.ibb.co/Hf3z8CgH/IMG-20250611-194040.jpg",
  "https://i.ibb.co/TxyXTrSF/images-14.jpg",
  "https://i.ibb.co/B257txV8/images-12.jpg",
  "https://i.ibb.co/dwWz6rZB/images-17.jpg",
];

const Banner = () => {
  return (
    <div className="w-[95%] max-w-5/6 mx-auto mt-8 mb-14 rounded-3xl overflow-hidden shadow-2xl border border-orange-200 dark:border-orange-400">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-[300px] sm:h-[420px] md:h-[500px] rounded-3xl"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`Banner ${idx + 1}`}
              loading="lazy"
              className="w-full h-[300px] sm:h-[420px] md:h-[500px] object-cover object-center transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
