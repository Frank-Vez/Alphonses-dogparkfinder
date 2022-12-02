import { UserContext } from "./UserContext";
import { ParkContext } from "./ParkContext";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper";

import ParkCard from "./ParkCard";

const Home = () => {
  console.log("mounting the home component");
  const [favPark, setFavPark] = useState();
  const { currentUser } = useContext(UserContext);
  const { parks } = useContext(ParkContext);

  //fetches the currentuser's favorite park
  useEffect(() => {
    console.log("home useeffect");
    console.log("current", currentUser);
    console.log("fav park", favPark);
    if (!favPark) {
      console.log("fetching a fucking park details");
      fetch(`/API/parks/${currentUser.favoritePark[0]}/noDetails`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            console.log(data);
            setFavPark(data.park);
          }
          if (data.status === 304) {
            console.log(data);
          } else {
            console.log(data);
          }
        });
    }
  }, [favPark, currentUser]);

  console.log("favpark", favPark);
  //settings for the slider
  if (parks && currentUser) {
    return (
      <PageBody>
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
                <SwiperSlide>
                  <ParkCard key={park._id + i} park={park} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </SliderContainer>
        <StyledInfos>
          {currentUser.hasAFavorite && favPark ? (
            <div>
              <div>
                <h2>Your favorite park is</h2>
                <h3>{favPark.name}</h3>
                <p>located at {favPark.position.address}</p>
                <ParkImg src={favPark.mainPicture} alt="park with dogs" />
              </div>
            </div>
          ) : (
            <div>
              <h2>You don't have a favorite park yet</h2>
              <p>Explore the parks to set your favorite park</p>
              <button>See all the parks</button>
            </div>
          )}
        </StyledInfos>
      </PageBody>
    );
  }
};

const StyledInfos = styled.div`
  flex: 1;
  border: solid 1px green;
`;

const ParkImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;

const PageBody = styled.div`
  display: flex;
  flex-direction: row;
  /* height: 100%; */
  border: solid 1px black;
`;

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

export default Home;
