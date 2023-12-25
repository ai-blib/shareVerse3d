export default () => {
    let instance;
    const data = {};
    return new Proxy(data, {
        get(_, prop) {
            return instance?.[prop] ?? data[prop];
        },
        set(_, prop, val) {
            if (prop === "__target") {
                instance = val;
                for (const [key, value] of Object.entries(data))
                    val[key] = value;
                return true;
            }
            data[prop] = val;
            instance && (instance[prop] = val);
            return true;
        }
    });
};
//# sourceMappingURL=createProxy.js.map