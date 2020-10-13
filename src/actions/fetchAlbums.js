import {
  fetchAlbumsPending,
  fetchAlbumsSuccess,
  fetchAlbumsError,
} from "./index";

import { API } from "../constants/api";

function fetchAlbums() {
  return (dispatch) => {
    dispatch(fetchAlbumsPending());
    // return fetch(`${API}/albums`)
    //   .then((res) =>
    //     res.ok ? res.json() : Promise.reject({ err: res.status })
    //   )
    //   .then((json) => {
    //     console.log(json);
    //     dispatch(fetchAlbumsSuccess(json));
    //   })
    //   .catch((error) => {
    //     const errMessage = error.err ? error.err : error.message;
    //     dispatch(fetchAlbumsError(errMessage));
    //   });
    return Promise.all([fetch(`${API}/albums`), fetch(`${API}/users`)])
      .then(
        (responses) => {
          return Promise.all(
            responses.map((response) =>
              response.ok
                ? response.json()
                : Promise.reject({ err: response.status })
            )
          );
        }
        // Get a JSON object from each of the responses
      )
      .then((json) => {
        if (json.length === 2 && json[0].length > 0 && json[1].length > 0) {
          let userMap = new Map();
          let userArray = json[1];
          let albumsArray = json[0];
          userArray.forEach((user) => userMap.set(user.id, user.name));
          albumsArray.forEach(
            (album) => (album.userName = userMap.get(album.userId))
          );
          console.log(userMap);
          console.log(JSON.stringify(albumsArray));
          dispatch(fetchAlbumsSuccess(albumsArray));
        } else {
          let error = new Error("Album data not in expected format");
          throw error;
        }
      })
      .catch((error) => {
        const errMessage = error.err ? error.err : error.message;
        dispatch(fetchAlbumsError(errMessage));
      });
  };
}

export default fetchAlbums;
