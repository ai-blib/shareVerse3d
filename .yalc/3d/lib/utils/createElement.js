export default (html) => {
    const el = document.createElement("div");
    el.innerHTML = html;
    return el.children[0];
};
//# sourceMappingURL=createElement.js.map