import { ENV } from "../constants/env";
import { get as _get, assignIn as _assignIn, clone as _clone } from "lodash";

const INIT = {
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

function buildOptions(options) {
  options.method = options.method || "GET";
  const init = _clone(INIT);
  if (options.method.toUpperCase() !== "GET") {
    _assignIn(init, {
      method: options.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.data || {}),
    });
  }
  return init;
}

async function fetchWrapper(url, options) {
  const init = buildOptions(options);
  const result = await fetch(ENV.HOST + url, init);
  return result.json();
}

export default fetchWrapper;
