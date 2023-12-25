import serialize from "../serializer/serialize";
import { getFileCurrent, setFileCurrent } from "../../states/useFileCurrent";
import unsafeSetValue from "../../utils/unsafeSetValue";
export default async () => {
    // @ts-ignore
    const { default: prettier } = await import("prettier/standalone");
    // @ts-ignore
    const { default: parser } = await import("prettier/parser-babel");
    const { fileSave } = await import("browser-fs-access");
    const code = prettier.format(JSON.stringify(await serialize(true)), {
        parser: "json",
        plugins: [parser]
    });
    const fileCurrent = getFileCurrent();
    const fileHandle = await fileSave(new Blob([code], { type: "text/plain" }), {
        fileName: "scene.json",
        extensions: [".json"],
        startIn: "downloads",
        id: "lingo3d"
    }, fileCurrent?.handle);
    if (fileCurrent)
        return;
    const file = await fileHandle?.getFile();
    if (!file)
        return;
    unsafeSetValue(file, "handle", fileHandle);
    setFileCurrent(file);
};
//# sourceMappingURL=saveJSON.js.map