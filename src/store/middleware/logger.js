const logger = (type) => (store) => (next) => (action) => {
  const specialTypes = ['error', 'info', 'warn'];
  const method = specialTypes.find(st => st === type) || 'log';
  console[method](action.type);
  next(action);
};

export default logger;
