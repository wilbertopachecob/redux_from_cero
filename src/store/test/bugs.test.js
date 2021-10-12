import configureStore from "../configureStore";
import { addBug, resolveBug } from "../bugs";

describe("bugsSlice - ", () => {
  let store;
  beforeEach(() => {
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;
  const mockFetch = (result, status = 200, error = null) =>
    jest.fn(() => {
      if (status === 200) {
        return Promise.resolve({ json: () => result });
      }
      return Promise.reject(error);
    });

  describe("addBug", () => {
    it("should add the bug to the store if its saved to the server", async () => {
      //appliying Arrange/Act/Assert or AAA
      const bug = { description: "a" };
      const savedBug = { ...bug, id: 1 };
      global.fetch = mockFetch(savedBug);

      await store.dispatch(addBug(bug));

      expect(bugsSlice().list).toHaveLength(1);
      expect(bugsSlice().list).toContainEqual(savedBug);
    });

    it("should not add the bug to the store if its saved to the server", async () => {
      const bug = { description: "a" };
      global.fetch = mockFetch(null, 404, new Error("Network error"));

      await store.dispatch(addBug(bug));

      expect(bugsSlice().list).toHaveLength(0);
    });
  });

  describe("resolveBug", () => {
    it("should resolve a bug", async () => {
      const bug = { description: "a" };
      const savedBug = { ...bug, id: 1, resolved: false };
      global.fetch = mockFetch(savedBug);

      await store.dispatch(addBug(bug));

      expect(bugsSlice().list).toHaveLength(1);

      const resolvedBug = { ...savedBug, resolved: true };
      global.fetch = mockFetch(resolvedBug);

      await store.dispatch(resolveBug(savedBug.id));
      expect(bugsSlice().list[0]).toEqual(resolvedBug);
    });
  });
});
