import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GoVideo } from "react-icons/go";

// const mediaList = [
//   "https://static123.com/watch?v=7277777",

//   "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2025/04/15/z6460390253087-4dfd2ae9beff3b06c424fcd14b3b21fa_1744682284.jpg",

//   "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2025/04/15/z6460391599667-5d38e9207841cffb68d69e346a93fdd4_1744682294.jpg",

//   "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2025/04/15/z6460391606176-22e4649aa773e24628694cd405460c35_1744682294.jpg",
// ];

const isVideo = (url) => {
  return url.match(/\.(mp4|webm)$/i) || url.includes("watch?");
};

export default function MediaSlider({ mediaList }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  };
  if (mediaList.length === 0) return <p>Không có media nào.</p>;

  return (
    <div className="relative w-full  mx-auto overflow-hidden rounded-lg shadow-lg bg-black">
      {/* Main Media */}
      <div className="w-full h-64 md:h-96">
        {isVideo(mediaList[currentIndex]) ? (
          <video
            controls
            className="w-full h-full object-contain bg-black"
            src={mediaList[currentIndex]}
          />
        ) : (
          <img
            src={mediaList[currentIndex]}
            alt={`media-${currentIndex}`}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full"
      >
        <FaChevronRight />
      </button>

      {/* Thumbnails */}
      <div className="flex justify-center items-center gap-2 p-2 bg-white rounded-b-md">
        {mediaList.map((item, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-20 h-15 border-2 ${
              index === currentIndex ? "border-blue-500" : "border-transparent"
            } rounded overflow-hidden`}
          >
            {isVideo(item) ? (
              <div className="w-full h-full bg-black flex items-center justify-center text-white text-xs">
                <GoVideo />
              </div>
            ) : (
              <img
                src={item}
                alt={`thumb-${index}`}
                className="w-full h-full object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
