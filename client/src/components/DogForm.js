import { GiBalloonDog } from "react-icons/gi";
import styled from "styled-components";
import { useState, useEffect } from "react";
import UploadWidget from "./UploadWidget";
import { useAuth0 } from "@auth0/auth0-react";

const DogForm = ({ setModalIsOpen, userId }) => {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  const [formData, setFormData] = useState({});
  const [breeds, setBreeds] = useState();
  const [picutreUrl, setPictureUrl] = useState();

  console.log(userId);

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  useEffect(() => {
    fetch("/API/getAllBreeds")
      .then((res) => res.json())
      .then((data) => setBreeds(data.data));
  }, []);

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
  };

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
        <button onClick={handleSubmit}>close modal</button>
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
