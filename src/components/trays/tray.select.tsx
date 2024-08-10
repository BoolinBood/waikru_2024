"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import {
  getFlowerName,
  getFlowerPath,
  getFlowers,
  largeFlowers,
  mediumFlowers,
  smallFlowers,
} from "@/src/utils/flower.utils";
import Button from "../ui/button";
import Image from "next/image";
import { useModal } from "@/src/context/ModalContext";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SelectTray = () => {
  const flowers = getFlowers();
  const { setSelectedFlower, setModalState } = useModal();
  const [tray, setTray] = useState<FlowerType>("ixora");

  const handleClick = () => {
    setModalState("none");

    setTimeout(() => {
      setSelectedFlower(tray);
      setModalState("createTray");
    }, 500);
  };

  const renderClass = (flower: FlowerType) => {
    if (smallFlowers.includes(flower)) {
      return "-decrease-sm";
    }
    if (mediumFlowers.includes(flower)) {
      return "-decrease-md";
    }
    if (largeFlowers.includes(flower)) {
      return "-decrease-lg";
    }

    return "";
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
          const flower = flowers[swiper.realIndex] as FlowerType;
          setTray(flower);
        }}
      >
        {flowers.map((flower) => (
          <SwiperSlide key={flower}>
            <h1 className="-title">{getFlowerName(flower as FlowerType)}</h1>

            <div className="-image">
              <Image
                src={getFlowerPath(flower)}
                className={renderClass(flower as FlowerType)}
                alt={flower}
                width={100}
                height={100}
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
