import downloadText from "./downloadText"
import serialize from "../serializer/serialize"

export default async () => {
    // @ts-ignore
    const { default: prettier } = await import("prettier/standalone")
    // @ts-ignore
    const { default: parser } = await import("prettier/parser-babel")

    const code = prettier.format(JSON.stringify(await serialize(true)), {
        parser: "json",
        plugins: [parser]
    })
    downloadText("scene.json", code)
}
