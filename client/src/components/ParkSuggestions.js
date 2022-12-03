import styled from "styled-components";
import ParkCard from "./ParkCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";
const ParkSuggestions = () => {
  const [parks, setParks] = useState(null);

  useEffect(() => {
    const getAllParks = async () => {
      const allParks = await fetch("/API/getAllParks");
      const allParksJson = await allParks.json();
      if (allParksJson.status === 200) {
        console.log("got em");
        setParks(allParksJson.message);
      } else {
        console.log("all parks json status", allParksJson);
      }
    };
    getAllParks();
  }, []);

  return (
    <>
      {parks ? (
        <SliderContainer>
          <h2>Explore new parks</h2>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {parks.map((park, i) => {
              return (
                <SwiperSlide key={park._id}>
                  <ParkCard key={park._id + i} park={park} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </SliderContainer>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

const SliderContainer = styled.div`
  /* max-width: 500px; */
  max-height: 500px;
  flex: 1;
  border: solid 1px blue;
  .swiper {
    width: 240px;
    height: 320px;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
  }
`;

export default ParkSuggestions;
