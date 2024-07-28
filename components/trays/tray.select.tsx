"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getFlowerName, getFlowerPath, getFlowers } from "@/utils/flower.utils";
import Button from "../ui/button";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";

const SelectTray = () => {
  const flowers = getFlowers();
  const { setSelectedFlower, setModalState } = useModal();
  const [tray, setTray] = useState<FlowerType>("ixora");

  const handleClick = () => {
    setSelectedFlower(tray);
    setModalState("createTray");
  };

  return (
    <div className="select-tray">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        centeredSlides={true}
        navigation
        loop={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSlideChange={(swiper) => {
          const index = swiper.activeIndex - 1 < 0 ? 5 : swiper.activeIndex - 1;
          const flower = flowers[index] as FlowerType;
          setTray(flower);
        }}
      >
        {flowers.map((flower) => (
          <SwiperSlide key={flower}>
            <h1 className="-title">{getFlowerName(flower as FlowerType)}</h1>

            <div className="-image">
              <Image
                src={getFlowerPath(flower)}
                alt={flower}
                width={200}
                height={200}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="-btn">
        <Button type="primary" onClick={handleClick}>
          <h1>Select</h1>
        </Button>
      </div>
    </div>
  );
};

export default SelectTray;
