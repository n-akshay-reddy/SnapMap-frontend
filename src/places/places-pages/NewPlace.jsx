import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import

import Input from '../../shared/shared-components/FormElements/Input';
import Button from '../../shared/shared-components/FormElements/Button.jsx';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators.js';
import { useForm } from '../../shared/hooks/form-hook.jsx';
import { useHttpClient } from '../../shared/hooks/http-hook.jsx';
import { AuthContext } from '../../shared/shared-components/Context/auth-context';
import ErrorModal from '../../shared/shared-components/UIElements/ErrorModal.jsx';
import LoadingSpinner from '../../shared/shared-components/UIElements/LoadingSpinner.jsx';
import ImageUpload from '../../shared/shared-components/FormElements/ImageUpload'
import './NewPlace.css';

const NewPlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const navigate = useNavigate(); // Replaced useHistory with useNavigate

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title',formState.inputs.title.value);
      formData.append('description',formState.inputs.description.value);
      formData.append("address",formState.inputs.address.value);
      formData.append("image",formState.inputs.image.value);

      
      await sendRequest('https://snapmap-backend.onrender.com/api/places','POST',formData, {
        Authorization: 'Bearer ' + auth.token
      });
      navigate('/'); // Replaced history.push with navigate
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload id='image' onInput={inputHandler} errorText="Please provide an image" />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
