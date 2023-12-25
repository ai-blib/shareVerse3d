import downloadBlob from "./downloadBlob";
export default (filename, data) => {
    const blob = new Blob([data], { type: "text/plain" });
    downloadBlob(filename, blob);
};
//# sourceMappingURL=downloadText.js.map