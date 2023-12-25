const traverseObject = (obj, cb, traversed = new WeakSet(), currentPath = []) => {
    if (Array.isArray(obj)) {
        if (traversed.has(obj))
            return;
        traversed.add(obj);
        for (let i = 0; i < obj.length; ++i) {
            const v = obj[i];
            const istr = i + "";
            const newPath = [...currentPath, istr];
            cb(istr, v, obj, newPath);
            traverseObject(v, cb, traversed, newPath);
        }
    }
    else if (obj && typeof obj === "object") {
        if (traversed.has(obj))
            return;
        traversed.add(obj);
        for (const [k, v] of Object.entries(obj)) {
            const newPath = [...currentPath, k];
            cb(k, v, obj, newPath);
            traverseObject(v, cb, traversed, newPath);
        }
    }
};
export default traverseObject;
//# sourceMappingURL=traverseObject.js.map