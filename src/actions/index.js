import { types } from "./types";

export function fetchAlbumsPending() {
  return {
    type: types.FETCH_ALBUMS_PENDING,
  };
}

export function fetchAlbumsSuccess(json) {
  return {
    type: types.FETCH_ALBUMS_SUCCESS,
    albums: json,
  };
}

export function fetchAlbumsError(error) {
  return {
    type: types.FETCH_ALBUMS_ERROR,
    error: error,
  };
}

export function fetchPhotosPending() {
  return {
    type: types.FETCH_PHOTOS_PENDING,
  };
}

export function fetchPhotosSuccess(json) {
  return {
    type: types.FETCH_PHOTOS_SUCCESS,
    photos: json,
  };
}

export function fetchPhotosError(error) {
  return {
    type: types.FETCH_PHOTOS_ERROR,
    error: error,
  };
}
