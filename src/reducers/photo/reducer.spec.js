import photoReducer from "./reducer";
import { types } from "../../actions/types";
import { photoData } from "../../fixtures/photoData";

const initialState = {
  pending: false,
  photos: [],
  error: null,
};
describe("Photo Reducer", () => {
  it("Should return initial state", () => {
    const newState = photoReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it("Should handle FETCH_PHOTOS_PENDING", () => {
    const newState = photoReducer(initialState, {
      type: types.FETCH_PHOTOS_PENDING,
    });
    expect(newState).toEqual({ ...initialState, pending: true });
  });

  it("Should handle FETCH_PHOTOS_SUCCESS", () => {
    const photosSuccess = photoData;
    const newState = photoReducer(
      { ...initialState, pending: true },
      {
        type: types.FETCH_PHOTOS_SUCCESS,
        photos: photosSuccess,
      }
    );
    expect(newState).toEqual({
      ...initialState,
      pending: false,
      photos: photosSuccess,
    });
  });

  it("Should handle FETCH_PHOTOS_ERROR", () => {
    const error = {
      message: "404 not found",
    };

    const newState = photoReducer(
      { ...initialState, pending: true },
      {
        type: types.FETCH_PHOTOS_ERROR,
        error: error,
      }
    );
    expect(newState).toEqual({ ...initialState, pending: false, error });
  });
});
