import { types } from "../../actions/types";

const initialState = {
  pending: false,
  photos: [],
  error: null,
};
const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PHOTOS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        pending: false,
        photos: action.photos,
      };
    case types.FETCH_PHOTOS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default photoReducer;
