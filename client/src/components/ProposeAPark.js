import { useState } from "react";
import UploadWidget from "./UploadWidget";
import styled from "styled-components";
import { useNavigate } from "react-router";
//this component lets the user propose a park.
//it goes in a proposition db that an admin will later be able to accept or discard and
//will be added to the park DB.
//the admin page hasnt been done yet
const ProposeAPark = () => {
  //name,position{geo, address},dogs:[], amenities,picture,comment:[]
  const [formData, setFormData] = useState({});
  const [picutreUrl, setPictureUrl] = useState();
  const [amenities, setamenities] = useState([]);

  const navigate = useNavigate();

  const amenitiesOptions = [
    "bench",
    "water fountain",
    "space for small dogs",
    "parkour",
    "poo bags",
    "6 feet fences",
    "double doors",
  ];

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleOptions = (e) => {
    console.log(e);
    if (e.target.checked) {
      setamenities([...amenities, e.target.value]);
    }
    if (!e.target.checked) {
      let index = amenities.indexOf(e.target.value);
      if (index !== -1) {
        setamenities([
          ...amenities.slice(0, index),
          ...amenities.slice(index, amenities.length - 1),
        ]);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name !== "" || formData.address !== "" || picutreUrl !== "")
      fetch("/API/proposeAPArk", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address:
            formData.address +
            ", " +
            formData.city +
            ", " +
            formData.province +
            ", Canada",
          name: formData.name,
          amenities: amenities,
          mainPicture: picutreUrl,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    setFormData({});
    alert("thank you for submitting!");
    navigate("/");
  };

  return (
    <div>
      <h2>Propose your park so that we can add it to our collection! </h2>
      <form>
        <StyledInput
          type={"text"}
          name={"name"}
          required
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder={"Dog park's name"}
        />
        <NameContainer>
          <StyledInput
            type={"text"}
            name={"address"}
            required
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder={"123 street name"}
          />

          <StyledInput
            type={"text"}
            name={"city"}
            required
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder={"park's city"}
          />
          <StyledInput
            type={"text"}
            name={"province"}
            required
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder={"park's Province"}
          />
        </NameContainer>{" "}
        <div>
          {amenitiesOptions.map((option) => {
            return (
              <>
                <input
                  type={"checkbox"}
                  name={option}
                  value={option}
                  onClick={(e) => handleOptions(e)}
                />
                <label htmlFor={option}>{option}</label>
              </>
            );
          })}
        </div>
        <div>
          <p>Select a picture that represents the park:</p>
          <UploadWidget setPictureUrl={setPictureUrl} />
        </div>
        <button onClick={(e) => handleSubmit(e)}>Submit your park</button>
      </form>
    </div>
  );
};

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

export default ProposeAPark;
