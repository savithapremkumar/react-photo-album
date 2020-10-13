import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchAlbums from "./fetchAlbums";
import { types } from "./types";
import fetchMock from "fetch-mock";
import expect from "expect";
import { API } from "../constants/api";
import { albumData } from "../fixtures/albumData";
import { userData } from "../fixtures/userData";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates FETCH_ALBUMS_SUCCESS when fetching albums has been done", () => {
    fetchMock
      .getOnce(`${API}/albums`, {
        albums: albumData,
      })
      .getOnce(`${API}/users`, {
        users: userData,
      });

    const expectedActions = [
      { type: types.FETCH_ALBUMS_PENDING },
      {
        type: types.FETCH_ALBUMS_SUCCESS,
        albums: { albums: albumData },
      },
    ];
    const store = mockStore({ albums: [] });
    console.log(store.getState());

    return store.dispatch(fetchAlbums()).then(() => {
      // return of async actions
      console.log(store.getActions());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
