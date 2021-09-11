import { cloneDeep as _cloneDeep } from "lodash";

export default function createStore(reducer) {
  let _store;
  let _listeners = [];

  function dispatch(action) {
    _store = _cloneDeep(reducer(_store, action));
    for (const listener of _listeners) {
        listener();
    }
  }

  function subscribe(listener) {
    _listeners = [...new Set([..._listeners, listener])];
  }

  function getState() {
    return _cloneDeep(_store);
  }

  return {
    dispatch,
    subscribe,
    getState,
  };
}
