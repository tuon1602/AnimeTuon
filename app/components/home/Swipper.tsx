"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

interface swiperProps {
  data: any;
}

const Swipper: React.FC<swiperProps> = ({ data }) => {
  console.log(data);
  return (
    <>
      <Swiper
        spaceBetween={10}
        loop={true}
        slidesPerView={3}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {data?.map((item: any, index: any) => (
          <SwiperSlide>
            <div className="relative w-[300px] h-[400px]">
              <Image
                src={item.image}
                alt="Anime Image"
                fill 
              />
              <p className="text-center text-2xl break-normal text-pinkpastel" >{item.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default Swipper;
