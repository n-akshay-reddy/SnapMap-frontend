import { useParams} from "react-router-dom";
import React,{useEffect,useState} from "react";

import PlaceList from "../places-components/PlaceList";
import ErrorModal from "../../shared/shared-components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/shared-components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";




const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
    const userId = useParams().uid;
  
    useEffect(() => {
      const fetchPlaces = async () => {
        try {
          const responseData = await sendRequest(
            `https://snapmap-backend.onrender.com/api/places/user/${userId}`
          );
          setLoadedPlaces(responseData.places);
        } catch (err) {}
      };
      fetchPlaces();
    }, [sendRequest, userId]);

    const placeDeleteHandler = (deletedPlace) => {
      setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlace))
    }
  
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
      </React.Fragment>
    );
  };
  
  export default UserPlaces;
  