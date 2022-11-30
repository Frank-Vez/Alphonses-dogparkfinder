import { useParams } from "react-router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineStar } from "react-icons/ai";
import { CiMapPin } from "react-icons/ci";
import { ImStatsBars } from "react-icons/im";

import CommentsSection from "./CommentsSection";

const ParkDetails = () => {
  const [toggleComments, setToggleComments] = useState(false);
  const { parkId } = useParams();
  const [parkData, setParkData] = useState(null);
  useEffect(() => {
    fetch(`/API/parks/${parkId}`)
      .then((res) => res.json())
      .then((data) => setParkData({ ...data.data, ...data.details }));
  }, [parkId]);

  const handleToggleComments = () => {
    setToggleComments(!toggleComments);
  };

  console.log(parkData);
  if (parkData) {
    return (
      <Body>
        <SubHeader>
          <h1>{parkData.name}</h1>
          <button>
            Make favorite
            <AiOutlineStar />
          </button>
        </SubHeader>
        <StyledSection>
          <ImgContainer>
            <StyledImg src={parkData.mainPicture} alt="park for dogs" />
          </ImgContainer>
          <div>
            <div>
              {parkData.position ? (
                <>
                  <CiMapPin size={30} /> <p>{parkData.position.address}</p>
                </>
              ) : null}

              <button> Get there!</button>
            </div>
            <div>
              <ImStatsBars size={30} />
              <div>
                <h3>
                  This data is taken from all the dogs frequenting the park of a
                  regular basis:
                </h3>
                {parkData.averageWeight ? (
                  <p>Average weight: {parkData.averageWeight}</p>
                ) : null}
                {parkData.averageHeight ? (
                  <p>Average height: {parkData.averageHeight}</p>
                ) : null}
                {parkData.mostCommonBreeds.length > 0 ? (
                  <ol>
                    Most common breeds:
                    {parkData.mostCommonBreeds.slice(0, 3).map((breed) => {
                      return <li>{breed[0]}</li>;
                    })}
                  </ol>
                ) : null}

                <p>% of dogs neutered: {parkData.neuteredRatio}</p>
              </div>
            </div>
          </div>
        </StyledSection>
        <section>
          <button onClick={handleToggleComments}>
            See comments about this park
          </button>
          {toggleComments ? (
            <CommentsSection
              comments={parkData.comments}
              parkId={parkData._id}
            />
          ) : null}
        </section>
      </Body>
    );
  }
};

const StyledImg = styled.img`
  width: 100%;
  height: auto;
`;

const ImgContainer = styled.div`
  flex: 0 0 50%;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
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
