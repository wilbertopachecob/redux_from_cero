import fetch from "../../libraries/fetch";
import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) {
      return next(action);
    }

    const { url, method, data, onStart, onSucess, onFail } = action.payload;

    if (onStart) {
      dispatch({ type: onStart });
    }

    next(action);

    try {
      const payload = await fetch(url, { method, data });
      dispatch(actions.apiCallSuccess(payload));
      if (onSucess) {
        dispatch({
          type: onSucess,
          payload,
        });
      }
    } catch (error) {
      dispatch(actions.apiCallFailed(error.message));
      if (onFail) {
        dispatch({ type: onFail, payload: error.message });
      }
    }
    // dispatch(onSucess(newAction.payload));
  };

export default api;
