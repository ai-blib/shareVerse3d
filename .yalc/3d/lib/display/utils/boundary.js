// @ts-ignore
export const calBoundary = (boxBounds, boundingBox) => {
    const { min, max } = boundingBox;
    const itemBoundary = (key) => {
        if (boxBounds.min[key] === undefined) {
            boxBounds.min[key] = min[key];
            boxBounds.max[key] = max[key];
        }
        else {
            if (boxBounds.min[key] > min[key]) {
                boxBounds.min[key] = min[key];
            }
            if (boxBounds.max[key] < max[key]) {
                boxBounds.max[key] = max[key];
            }
        }
    };
    itemBoundary("y");
    itemBoundary("z");
    itemBoundary("x");
};
//# sourceMappingURL=boundary.js.map