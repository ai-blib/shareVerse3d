import store from "@lincode/reactivity"

export const [setAntiAlias, getAntiAlias] = store<"MSAA" | "SMAA" | false | true>(
    true
)
