import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchPhotos from "./fetchPhotos";
import { types } from "./types";
import fetchMock from "fetch-mock";
import expect from "expect";
import { API } from "../constants/api";
import { photoData } from "../fixtures/photoData";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates FETCH_PHOTOS_SUCCESS when fetching photos has been done", () => {
    fetchMock.getOnce(`${API}/albums/1/photos`, {
      photos: photoData,
    });

    const expectedActions = [
      { type: types.FETCH_PHOTOS_PENDING },
      {
        type: types.FETCH_PHOTOS_SUCCESS,
        photos: { photos: photoData },
      },
    ];
    const store = mockStore({ photos: [] });
    console.log(store.getState());

    return store.dispatch(fetchPhotos(1)).then(() => {
      // return of async actions
      console.log(store.getActions());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
