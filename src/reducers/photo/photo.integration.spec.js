import { testStore } from "../../../utils";
import fetchPhotos from "../../actions/fetchPhotos";

describe("fetch api action", () => {
  let store;
  let albumId = 1;
  beforeEach(() => {
    store = testStore();
  });

  it("Store is updated with the photos from selected album id", async () => {
    return store.dispatch(fetchPhotos(albumId)).then(() => {
      const newState = store.getState();
      expect(newState.photo.photos[0]).toHaveProperty("id");
      expect(newState.photo.photos[0]).toHaveProperty("url");
      expect(newState.photo.photos[0]).toHaveProperty("thumbnailUrl");
      expect(newState.photo.photos[0].id).toEqual(albumId);
    });
  });
});
