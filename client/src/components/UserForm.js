import { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Tippy from "@tippyjs/react";
import { GiBalloonDog } from "react-icons/gi";
import UploadWidget from "./UploadWidget";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { UserContext } from "./UserContext";

const UserForm = () => {
  const { setMustCreateProfile } = useContext(UserContext);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [formData, setFormData] = useState({});
  const [breeds, setBreeds] = useState();
  const [picutreUrl, setPictureUrl] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/API/getAllBreeds")
      .then((res) => res.json())
      .then((data) => setBreeds(data.data));
  }, []);

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Object.entries(formData).length);
    if (Object.entries(formData).length === 10 && picutreUrl) {
      fetch("/API/addNewUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: user.email,
            address:
              formData.address +
              ", " +
              formData.city +
              ", " +
              formData.province +
              ", Canada",
            dogs: null,
          },
          dog: {
            name: formData.dogName,
            weight: formData.dogWeight,
            height: formData.dogHeight,
            picture: picutreUrl,
            neutered: formData.neutered,
            breed: formData.breed,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("thank you for completing you profile");
          setMustCreateProfile(false);
          navigate("/");
          console.log(data);
        });
    } else {
      alert("All field must be filled");
    }
  };

  if (!isLoading && isAuthenticated && user && breeds) {
    return (
      <Wrapper>
        <StyledForm>
          <NameSection>
            <h3>Personal infos</h3>
            <NameContainer>
              <StyledInput
                type={"text"}
                name={"firstName"}
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder={"First name"}
                value={user.given_name}
              />
              <StyledInput
                type={"text"}
                name={"lastName"}
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder={"Last Name"}
                value={user.family_name}
              />
              <StyledInput
                type={"email"}
                name={"email"}
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder={"email@something.com"}
                disabled
                value={user.email}
              />
            </NameContainer>
          </NameSection>
          <NameSection>
            <h3>address</h3>
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
                placeholder={"Your city"}
              />
              <StyledInput
                type={"text"}
                name={"province"}
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder={"Your Province"}
              />
            </NameContainer>
          </NameSection>
          <NameSection>
            <h2>
              Your dog <GiBalloonDog />
            </h2>
            <p>
              If you have more than one don't worry, you can add those later in
              your profile page
            </p>
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
                type={"number"}
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
          </NameSection>
          <button onClick={(e) => handleSubmit(e)}>
            Complete my profile!{" "}
          </button>
        </StyledForm>
      </Wrapper>
    );
  }
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 3px var(--color-border);
  margin: 3em 2em;
  box-shadow: 20px 18px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default UserForm;
