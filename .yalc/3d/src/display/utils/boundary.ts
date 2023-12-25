// @ts-ignore
export const calBoundary = (boxBounds: any, boundingBox: any) => {
    const { min, max } = boundingBox
    const itemBoundary = (key: "x" | "y" | "z") => {
        if (boxBounds.min[key] === undefined) {
            boxBounds.min[key] = min[key]
            boxBounds.max[key] = max[key]
        } else {
            if (boxBounds.min[key] > min[key]) {
                boxBounds.min[key] = min[key]
            }
            if (boxBounds.max[key] < max[key]) {
                boxBounds.max[key] = max[key]
            }
        }
    }
    itemBoundary("y")
    itemBoundary("z")
    itemBoundary("x")
}
