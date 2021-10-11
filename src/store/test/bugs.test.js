import configureStore from "../configureStore";
import { addBug } from "../bugs";

describe('bugsSlice - ', () => {
    it('should handle the addBug action', async () => {
        global.fetch = jest.fn(() => Promise.resolve({json: () => {}}));
        const store = configureStore();
        const bug = {description: 'a'};
        const x = await store.dispatch(addBug(bug));
        expect(store.getState().entities.bugs.list).toHaveLength(1);
        expect().
    });
});
