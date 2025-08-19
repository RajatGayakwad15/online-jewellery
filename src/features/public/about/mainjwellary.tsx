import { useState, useEffect, useRef } from "react";
import image from "@/assets/extra imges/sets.webp";
import neklase1 from "@/assets/extra imges/neklase.jpg";
import neklase2 from "@/assets/extra imges/neklase2.jpg";
import neklase3 from "@/assets/extra imges/neklase3.webp";
import image2 from "@/assets/extra imges/jwellaryset.jpeg"

const carouselData = [
  {
    image: neklase3,
    text: "Crafted with Loveheri"
  },
  {
    image: neklase2,
    text: "Shiny and Stylish"
  },
  {
    image: image2,
    text: "Timeless Beauty"
  },
  {
    image: neklase1,
    text: "Perfect for Every Occasion"
  },
  {
    image: image,
    text: "Elegant Jwellary Set"
  }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  };

  // Auto slide every 2 seconds
  useEffect(() => {
    // Clear any previous interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
    }, 2000);

    // Cleanup on unmount or when currentIndex changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex]);

  return (
    <div id="indicators-carousel" className="relative w-full h-screen">
      {/* Full-Screen Image Container */}
      <div className="relative w-full h-full overflow-hidden">
        {carouselData.map((item, index) => (
          <img
            key={index}
            src={item.image}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            alt={`Slide ${index + 1}`}
          />
        ))}

        {/* Dynamic Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white md:text-3xl text:lg font-bold">
          {carouselData[currentIndex].text}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute z-30 flex space-x-3 bottom-5 left-1/2 -translate-x-1/2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 bg-white/30 hover:bg-white/50 rounded-full"
      >
        ❮
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 bg-white/30 hover:bg-white/50 rounded-full"
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
