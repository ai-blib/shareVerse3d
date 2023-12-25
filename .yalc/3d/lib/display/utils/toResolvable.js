import { Resolvable } from "@lincode/promiselikes";
export default (promise) => {
    const resolvable = new Resolvable();
    promise.then((val) => {
        resolvable.resolve(val);
    });
    return resolvable;
};
//# sourceMappingURL=toResolvable.js.map