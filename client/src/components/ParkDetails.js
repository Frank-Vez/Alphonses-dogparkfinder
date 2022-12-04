import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AiOutlineStar } from "react-icons/ai";
import { BsFillPinMapFill } from "react-icons/bs";

import { addFavoritePark } from "./utils.js/fetches";

import CommentsSection from "./CommentsSection";
import ParkMap from "./ParkMap";
import { UserContext } from "./UserContext";
import ParkDataSection from "./ParkDataSection";

const ParkDetails = () => {
  const { currentUser, rerenderUser, setRerenderUser } =
    useContext(UserContext);
  const [toggleComments, setToggleComments] = useState(false);
  const [toggleMap, setToggleMap] = useState(false);
  const { parkId } = useParams();
  const [parkData, setParkData] = useState(null);
  const [commentsRerender, setCommentsRerender] = useState(false);

  useEffect(() => {
    fetch(`/API/parks/${parkId}`)
      .then((res) => res.json())
      .then((data) => setParkData({ ...data.data, ...data.details }));
  }, [parkId, commentsRerender]);

  const handleToggleComments = () => {
    setToggleComments(!toggleComments);
  };

  const handleToggleMap = () => {
    setToggleMap(!toggleMap);
  };

  const handleAddFavorite = () => {
    addFavoritePark(
      parkId,
      currentUser._id,
      currentUser.dogs,
      currentUser.favoritePark[0]
    );
    alert("added to favorite");
    setTimeout(() => {
      setRerenderUser(!rerenderUser);
    }, 1500);
  };

  if (parkData) {
    return (
      <Body>
        <SubHeader>
          <h1>{parkData.name}</h1>
          <button
            onClick={() => handleAddFavorite()}
            disabled={currentUser.favoritePark[0] === parkId ? true : false}
          >
            {currentUser.favoritePark[0] === parkId
              ? "already Favorite"
              : " Make favorite"}

            <AiOutlineStar />
          </button>
        </SubHeader>
        <ParkDataSection parkData={parkData} />
        <PositionControl>
          {parkData.position ? (
            <PinAddressStyled>
              <BsFillPinMapFill size={40} color={"#005034"} fill={"#005034"} />{" "}
              <p>{parkData.position.address}</p>
            </PinAddressStyled>
          ) : null}

          <button onClick={handleToggleMap}> Get there!</button>
        </PositionControl>
        <section>
          <button onClick={handleToggleComments}>
            {toggleComments ? "Hide comments" : "See comments"}
          </button>
          {toggleComments ? (
            <CommentsSection
              comments={parkData.comments}
              parkId={parkData._id}
              setCommentsRerender={setCommentsRerender}
              commentsRerender={commentsRerender}
            />
          ) : null}
        </section>
        {toggleMap ? <ParkMap parkPosition={parkData.position} /> : null}
      </Body>
    );
  }
};

const PositionControl = styled.div`
  display: flex;
`;

const PinAddressStyled = styled.div`
  display: flex;
  align-items: center;
`;

const Body = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SubHeader = styled.div`
  display: flex;
  flex-direction: row;
  min-height: min-content;
  width: 100%;
  align-items: center;
`;

export default ParkDetails;
