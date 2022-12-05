import styled from "styled-components";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState, useContext, useRef } from "react";
import { UserContext } from "./UserContext";
//this component renders the map for each dogparks
const ParkMap = ({ parkPosition }) => {
  const center = parkPosition.geo;
  const { currentUser } = useContext(UserContext);
  //accepts the google api direction response to be placed in the route api
  const [directionsResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  //sets the ref for the origin and destination
  const originRef = useRef();
  const destinationRef = useRef();
  //used to make sure the google map is loaded
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  //sets the route if the user entered 2 addresses
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
  //removes the values
  const clearRoute = () => {
    setDistance("");
    setDuration("");
    setDirectionResponse(null);
    originRef.current.value = "";
    destinationRef.current.value = "";
  };

  return (
    <div>
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
