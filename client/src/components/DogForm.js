//import hooks from react
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
//import upload widget to add pictures
import UploadWidget from "./UploadWidget";

import { GiBalloonDog } from "react-icons/gi";
import { UserContext } from "./UserContext";

//this component renders the form to add a dog in the modal
const DogForm = ({ setModalIsOpen, userId }) => {
  //declares the state to accepts the form data
  const [formData, setFormData] = useState({});
  //declares a state to accepts the breeds from the fetch
  const [breeds, setBreeds] = useState();
  //declares a state to accept the picture url after uploading it
  const [picutreUrl, setPictureUrl] = useState();
  //imports the rerender state from the UserContext
  const { rerenderUser, setRerenderUser } = useContext(UserContext);

  //sets the form data to a key-value pari from all the input
  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  //fetch all the breeds from the db on mount only
  useEffect(() => {
    fetch("/API/getAllBreeds")
      .then((res) => res.json())
      .then((data) => setBreeds(data.data));
  }, []);

  //fetch PATCh to submit the dog, then rerender the user
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/API/user/${userId}/addADog`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.dogName,
        weight: formData.dogWeight,
        height: formData.dogHeight,
        picture: picutreUrl,
        neutered: formData.neutered,
        breed: formData.breed,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setModalIsOpen(false);
    setTimeout(() => {
      setRerenderUser(!rerenderUser);
    }, 1500);
  };

  //close the form
  const handleClose = (e) => {
    e.preventDefault();
    setModalIsOpen(false);
  };

  return (
    <>
      <NameSection>
        <h2>
          Add a dog <GiBalloonDog />
        </h2>
        <NameContainer>
          <StyledInput
            type={"text"}
            name={"dogName"}
            required
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder={"Your dog's name"}
          />
          <StyledInput
            type={"number"}
            name={"dogWeight"}
            required
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder={"weight in pounds"}
          />
          <StyledInput
            type={"text"}
            name={"dogHeight"}
            required
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder={"height in cm"}
          />
        </NameContainer>

        <div>
          <p>Is your dog neutered?</p>
          <StyledInput
            type={"radio"}
            name={"neutered"}
            required
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={true}
          />
          <label htmlFor={"neutered"}>Yes</label>
          <StyledInput
            type={"radio"}
            name={"neutered"}
            required
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={false}
          />
          <label htmlFor={"neutered"}>No</label>
        </div>
        <div>
          <label htmlFor={"breed"}>select your dog's breed</label>
          <select
            name={"breed"}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          >
            <option value={"invalid"}>Breeds</option>
            {breeds?.map((breed) => {
              return (
                <option key={breed._id} value={breed.name}>
                  {breed.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <p>Import a picture of your dog:</p>
          <UploadWidget setPictureUrl={setPictureUrl} />
        </div>
        <button onClick={handleSubmit}>Save your dog</button>
      </NameSection>
      <button onClick={handleClose}>close</button>
    </>
  );
};

const NameSection = styled.section`
  display: flex;
  margin: 2em;
  flex-direction: column;
  justify-content: space-between;
`;

const NameContainer = styled.div`
  display: flex;
`;

const StyledInput = styled.input`
  border-color: var(--color-border);
  min-width: fit-content;
  font-size: 18px;
  border-radius: 5px;
  flex: 1 1 30%;
  margin: 2px 2px;
`;

export default DogForm;
