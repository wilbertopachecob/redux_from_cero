import configureStore from "../configureStore";
import { addBug, resolveBug, getUnresolvedBugs, loadBugs } from "../bugs";

const SERVER_ERROR = new Error("Internal Server Error");

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

  const createStore = (list = []) => ({
    entities: {
      bugs: {
        list,
      },
    },
  });

  describe("addBug", () => {
    it("should add the bug to the store if its saved to the server", async () => {
      //applying Arrange/Act/Assert or AAA
      const bug = { description: "a" };
      const savedBug = { ...bug, id: 1 };
      global.fetch = mockFetch(savedBug);

      await store.dispatch(addBug(bug));

      expect(bugsSlice().list).toHaveLength(1);
      expect(bugsSlice().list).toContainEqual(savedBug);
    });

    it("should not add the bug to the store if its saved to the server", async () => {
      const bug = { description: "a" };
      global.fetch = mockFetch(null, 500, SERVER_ERROR);

      await store.dispatch(addBug(bug));

      expect(bugsSlice().list).toHaveLength(0);
    });
  });

  describe("resolveBug", () => {
    const id = 1;
    const bug = { id, resolved: false };
    const resolvedBug = { id, resolved: true };

    it("should resolve a bug when updated on server ", async () => {
      global.fetch = mockFetch(bug);

      await store.dispatch(addBug({}));

      expect(bugsSlice().list).toHaveLength(1);

      global.fetch = mockFetch(resolvedBug);

      await store.dispatch(resolveBug(id));

      expect(bugsSlice().list[0].resolved).toBe(true);
    });

    it("should not resolve a bug when not updated on server ", async () => {
      global.fetch = mockFetch(bug);

      await store.dispatch(addBug({}));

      expect(bugsSlice().list).toHaveLength(1);

      global.fetch = mockFetch(resolvedBug, 500, SERVER_ERROR);

      await store.dispatch(resolveBug(id));

      expect(bugsSlice().list[0].resolved).toBe(false);
    });
  });

  describe("selectors", () => {
    test("getUnresolvedBugs", () => {
      const store = createStore([{ resolved: true }, {}, {}]);

      const result = getUnresolvedBugs(store);

      expect(result).toHaveLength(2);
    });
  });

  describe("loadBugs", () => {
    describe("return from cache if the exist in the cache", () => {});
    describe("loading", () => {
      it("should set loading to false after returning bugs from server", async () => {
        global.fetch = mockFetch([{}]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().loading).toBe(false);
      });

      it("should set loading to false if the server fails", async () => {
        global.fetch = mockFetch(null, 500, SERVER_ERROR);

        await store.dispatch(loadBugs());

        expect(bugsSlice().loading).toBe(false);
      });
    });
  });
});
