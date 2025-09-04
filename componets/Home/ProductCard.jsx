'use client';
import React, { useEffect, useState } from "react";
import Title from "@/componets/SectionTitles/Title";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then(response => response.json())
      .then(data => {
        setData(data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const createSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-700">Working on products...</div>
      </div>
    );
  }

  // Slider settings for responsiveness and appearance
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ],
    arrows: true,
    autoplay: false,
    swipeToSlide: true,
    adaptiveHeight: true,
  };

  return (
    <div className="outer pt-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-[1200px] w-full px-4 py-6">
        <div className="product-inner">
          <div className="product-inner-content">
            <Title
              title="Our Products"
              subtitle="Trusted by industries across Vapi and Silvassa for quality electrical products and exceptional service"
            />
            <Slider {...settings} className="product-carousel">
              {data.slice(0, 20).map((product) => (
                <div key={product.id} className="p-3">
                  <div className="bg-white rounded-2xl shadow-lg border border-[#d2af6f]/30 hover:border-[#8b2727] transition-colors duration-200 p-6 h-full flex flex-col">
                    <Link
                      href={`/shop/${createSlug(product.title)}`}
                      className="w-full h-48 mb-4 bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] rounded-xl flex items-center justify-center overflow-hidden"
                    >
                      <img
                        className="max-w-full max-h-full object-contain"
                        src={product.images[0]}
                        alt={product.title}
                      />
                    </Link>

                    <div className="flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                          {product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title}
                        </h3>
                        <div className="flex items-center bg-[#f8f3e9] px-2 py-1 rounded-full">
                          <span className="text-[#d2af6f]">★</span>
                          <span className="text-sm text-gray-700 ml-1 font-medium">{product.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description.length > 80 ? product.description.slice(0, 80) + "..." : product.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-[#8b2727]">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-[#8b2727] bg-[#f8f3e9] px-3 py-1 rounded-full font-medium">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
