import configureStore from "./store/configureStore";
import { bugAdded, bugRemoved, bugResolved } from "./store/bugs";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
    console.log('Store Changed!', store.getState());
})

console.log(store.getState());

store.dispatch(bugAdded('My first bug'));

store.dispatch(bugResolved(1));

store.dispatch(bugRemoved(1));
