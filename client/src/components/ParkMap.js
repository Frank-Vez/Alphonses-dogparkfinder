import styled from "styled-components";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState, useContext, useRef } from "react";
import { UserContext } from "./UserContext";

const ParkMap = ({ parkPosition }) => {
  const center = parkPosition.geo;
  const { currentUser } = useContext(UserContext);
  const [map, setMap] = useState(null); //might have to delete
  const [directionsResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return alert("Both destination and origin must be filled");
    }
    //eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      //eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING,
    });
    setDirectionResponse(result);
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].duration.text);
  };

  const clearRoute = () => {
    setDistance("");
    setDuration("");
    setDirectionResponse(null);
    originRef.current.value = "";
    destinationRef.current.value = "";
  };

  return (
    <div>
      hello from map
      {!isLoaded ? (
        <p>...loading...</p>
      ) : (
        <>
          <div>
            <Autocomplete>
              <input
                type={"text"}
                placeholder={"your starting point"}
                value={currentUser.address ? currentUser.address : ""}
                ref={originRef}
              />
            </Autocomplete>
            <Autocomplete>
              <input
                type={"text"}
                name={"finish"}
                placeholder={"the dog park"}
                value={parkPosition.address ? parkPosition.address : ""}
                ref={destinationRef}
              ></input>
            </Autocomplete>
            <button onClick={calculateRoute}>Confirm!</button>
            <button onClick={clearRoute}>Clear</button>
            <p>distance: {distance}</p>
            <p>duration: {duration}</p>
          </div>
          <StyledMapContainer>
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              {/* <Marker position={center} /> */}
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </StyledMapContainer>
        </>
      )}
    </div>
  );
};

const StyledMapContainer = styled.div`
  width: 100%;
  height: 500px;
  border: solid 1px black;
`;
export default ParkMap;
