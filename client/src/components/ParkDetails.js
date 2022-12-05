//imports hooks from react
import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
//imports icons
import { AiOutlineStar } from "react-icons/ai";
import { BsFillPinMapFill } from "react-icons/bs";
//imports fetches from utils
import { addFavoritePark } from "./utils.js/fetches";
//import components
import CommentsSection from "./CommentsSection";
import ParkMap from "./ParkMap";
import { UserContext } from "./UserContext";
import ParkDataSection from "./ParkDataSection";

//this components fetches and renders all the infos we have on a park
const ParkDetails = () => {
  const { currentUser, rerenderUser, setRerenderUser } =
    useContext(UserContext);
  const [toggleComments, setToggleComments] = useState(false);
  const [toggleMap, setToggleMap] = useState(false);
  const { parkId } = useParams();
  const [parkData, setParkData] = useState(null);
  const [commentsRerender, setCommentsRerender] = useState(false);

  //fetches all thei nfo I have on a park, rerenders if the user change of park of if he modifies a comment
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

  //calls the add to favorite fetch PATCH, then rerender.
  //after the submission, ill change the set timeout to a conditionnal based on the response of a fetch,
  //but for now it works and thats what matters.
  //the SetTimeout is there to make sure I dont call 2 fetches at the same time, crashing mongo and the server.
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
