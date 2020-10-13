import {
  fetchPhotosPending,
  fetchPhotosSuccess,
  fetchPhotosError,
} from "./index";
import { API } from "../constants/api";

function fetchPhotos(albumID) {
  return (dispatch) => {
    dispatch(fetchPhotosPending());
    return fetch(`${API}/albums/${albumID}/photos`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject({ err: res.status })
      )
      .then((json) => {
        console.log(json);
        dispatch(fetchPhotosSuccess(json));
      })
      .catch((error) => {
        const errMessage = error.err ? error.err : error.message;
        dispatch(fetchPhotosError(errMessage));
      });
  };
}

export default fetchPhotos;
