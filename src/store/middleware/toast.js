const toast = (store) => (next) => (action) => {
  if (action.type === "error") {
    console.error(`Toastify: `, action.payload.message);
    return;
  }
  next(action);
};

export default toast;
