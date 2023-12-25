import { upperFirst } from "@lincode/utils";
import serialize from "../serializer/serialize";
import downloadText from "./downloadText";
const serializeReact = (nodes) => {
    let result = "";
    for (const node of nodes) {
        const componentName = upperFirst(node.type);
        let props = "";
        for (const [key, value] of Object.entries(node)) {
            if (key === "children" || key === "type")
                continue;
            if (typeof value === "string")
                props += ` ${key}="${value}"`;
            else if (value === true)
                props += ` ${key}`;
            else if (typeof value === "object")
                props += ` ${key}={${JSON.stringify(value)}}`;
            else
                props += ` ${key}={${value}}`;
        }
        result +=
            "children" in node && node.children
                ? `<${componentName}${props}>${serializeReact(node.children)}</${componentName}>`
                : `<${componentName}${props} />`;
    }
    return result;
};
export default async () => {
    // @ts-ignore
    const prettier = (await import("prettier/standalone")).default;
    // @ts-ignore
    const parser = (await import("prettier/parser-babel")).default;
    const code = prettier.format(`const App = () => {
            return (
                <World>
                    ${serializeReact(await serialize())}
                </World>
            )
        }`, { parser: "babel", plugins: [parser] });
    downloadText("App.jsx", code);
};
//# sourceMappingURL=exportReact.js.map