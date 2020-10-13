import { types } from "../../actions/types";

const initialState = {
  pending: false,
  albums: [],
  error: null,
};
const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALBUMS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        pending: false,
        albums: action.albums,
      };
    case types.FETCH_ALBUMS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default albumReducer;
