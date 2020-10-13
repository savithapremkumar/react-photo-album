import albumReducer from "./reducer";
import { types } from "../../actions/types";

const initialState = {
  pending: false,
  albums: [],
  error: null,
};
describe("Album Reducer", () => {
  it("Should return initial state", () => {
    const newState = albumReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it("Should handle FETCH_ALBUMS_PENDING", () => {
    const newState = albumReducer(initialState, {
      type: types.FETCH_ALBUMS_PENDING,
    });
    expect(newState).toEqual({ ...initialState, pending: true });
  });

  it("Should handle FETCH_ALBUMS_SUCCESS", () => {
    const albumsSuccess = [
      {
        userId: 1,
        id: 1,
        title: "quidem molestiae enim",
      },
      {
        userId: 1,
        id: 2,
        title: "sunt qui excepturi placeat culpa",
      },
    ];
    const newState = albumReducer(
      { ...initialState, pending: true },
      {
        type: types.FETCH_ALBUMS_SUCCESS,
        albums: albumsSuccess,
      }
    );
    console.log(newState);
    expect(newState).toEqual({
      ...initialState,
      pending: false,
      albums: albumsSuccess,
    });
  });

  it("Should handle FETCH_ALBUMS_ERROR", () => {
    const error = {
      message: "404 not found",
    };

    const newState = albumReducer(
      { ...initialState, pending: true },
      {
        type: types.FETCH_ALBUMS_ERROR,
        error: error,
      }
    );
    expect(newState).toEqual({ ...initialState, pending: false, error });
  });
});
