import { testStore } from "../../../utils";
import fetchAlbums from "../../actions/fetchAlbums";

describe("fetch api action", () => {
  let store;
  beforeEach(() => {
    store = testStore();
  });

  it("Store is updated correctly with the list of albums", async () => {
    return store.dispatch(fetchAlbums()).then(() => {
      const newState = store.getState();
      expect(newState.album.albums.length).not.toBeLessThan(1);
      expect(newState.album.albums[0]).toHaveProperty("userId");
      expect(newState.album.albums[0]).toHaveProperty("title");
      expect(newState.album.albums[0]).toHaveProperty("userName");
    });
  });
});
