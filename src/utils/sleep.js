const sleep = (ms) => {
    return new Promise((resolver) => {
        setTimeout(resolver, ms);
    });
};
export default sleep;
