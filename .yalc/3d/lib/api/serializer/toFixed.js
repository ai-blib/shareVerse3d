const toFixed = (key, v) => Number(v.toFixed(2));
export default toFixed;
export const toFixedPoint = (value) => {
    if ("z" in value)
        return {
            x: toFixed("x", value.x),
            y: toFixed("y", value.y),
            z: toFixed("z", value.z)
        };
    return {
        x: toFixed("x", value.x),
        y: toFixed("y", value.y)
    };
};
//# sourceMappingURL=toFixed.js.map