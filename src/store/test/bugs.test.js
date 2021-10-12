import configureStore from "../configureStore";
import { addBug } from "../bugs";

describe("bugsSlice - ", () => {
  let store;
  beforeEach(() => {
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;

  it("should add the bug to the store if its saved to the server", async () => {
    //appliying Arrange/Act/Assert or AAA
    const bug = { description: "a" };
    const savedbug = { ...bug, id: 1 };
    global.fetch = jest.fn(() => Promise.resolve({ json: () => savedbug }));

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toHaveLength(1);
    expect(bugsSlice().list).toContainEqual(savedbug);
  });

  it("should not add the bug to the store if its saved to the server", async () => {
    const bug = { description: "a" };
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toHaveLength(0);
  });
});
