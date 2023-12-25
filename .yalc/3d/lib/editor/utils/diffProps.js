export default (prev, next, omit = { style: true }) => {
    for (const [k, v] of Object.entries(prev))
        if (!omit[k] && v !== next[k])
            return false;
    return true;
};
//# sourceMappingURL=diffProps.js.map