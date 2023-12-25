export declare const computeValuePerFrame: <Item extends Object, Return>(cb: (item: Item) => Return) => (item: Item) => Return;
declare const _default: <Item extends Object, Return extends {
    clone: () => Return;
}>(cb: (item: Item) => Return) => (item: Item) => Return;
export default _default;
