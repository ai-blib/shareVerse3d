export default (to, from, keys) => {
    for (const key of keys)
        key in to && (to[key] = from[key]);
};
//# sourceMappingURL=assignIn.js.map