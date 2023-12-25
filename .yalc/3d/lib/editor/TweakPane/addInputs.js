const toFixed = (v) => (typeof v === "number" ? Number(v.toFixed(2)) : v);
export default (pane, title, params, onChange) => {
    const folder = pane.addFolder({ title });
    const options = {};
    for (const [key, value] of Object.entries(params))
        switch (typeof value) {
            case "undefined":
                params[key] = "";
                break;
            case "number":
                params[key] = toFixed(value);
                break;
            case "object":
                if (Array.isArray(value)) {
                    params[key] = JSON.stringify(value);
                    break;
                }
                if ("values" in value) {
                    params[key] = value.value;
                    options[key] = {
                        options: Object.fromEntries(value.values.map((item) => [item, item]))
                    };
                    break;
                }
                typeof value?.x === "number" && (value.x = toFixed(value.x));
                typeof value?.y === "number" && (value.y = toFixed(value.y));
                typeof value?.z === "number" && (value.z = toFixed(value.z));
                break;
        }
    return Object.fromEntries(Object.keys(params).map((key) => {
        const input = folder.addInput(params, key, options[key]);
        input.on("change", ({ value }) => {
            if (typeof value === "string") {
                if (value === "true" || value === "false") {
                    onChange(key, value === "true" ? true : false);
                    return;
                }
                const num = parseFloat(value);
                if (!Number.isNaN(num)) {
                    onChange(key, num);
                    return;
                }
            }
            onChange(key, toFixed(value));
        });
        return [key, input];
    }));
};
//# sourceMappingURL=addInputs.js.map