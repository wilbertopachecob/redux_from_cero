const logger = type => store => next => action => {
    console.log({
        type
    });
    next(action);
}

export default logger;