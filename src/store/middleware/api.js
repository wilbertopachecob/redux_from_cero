import fetch from "../../libraries/fetch";
import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) {
      return next(action);
    }

    next(action);
    const { url, method, data, onSucess, onFail } = action.payload;
    try {
      const payload = await fetch(url, { method, data });
      if (!onSucess) {
        dispatch(actions.apiCallSuccess(payload));  
        return
      }
      dispatch({
        type: onSucess,
        payload,
      });
    } catch (error) {
      if (!onFail) {
        dispatch(actions.apiCallFailed(error));
        return;
      }
      dispatch({ type: "error", payload: error });
    }
    // dispatch(onSucess(newAction.payload));
  };

export default api;
