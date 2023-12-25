export default (url) => {
    const parts = url.split("/");
    if (parts.at(-1)?.includes(".")) {
        parts.pop();
        return parts.join("/");
    }
    return url;
};
//# sourceMappingURL=dirPath.js.map