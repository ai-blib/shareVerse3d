import { ComponentChildren } from "preact"
import { CSSProperties } from "preact/compat"
import Transition from "../component/Transition"

interface InfoScreen {
    mounted?: boolean
    style?: CSSProperties
    children?: ComponentChildren
    fadeIn?: boolean
}

export default ({ mounted, style, children, fadeIn }: InfoScreen) => {
    return (
        <Transition mounted={mounted}>
            {(enter) => (
                // @ts-ignore
                <div
                    className="lingo3d-absfull lingo3d-flexcenter"
                    // @ts-ignore
                    style={{ flexDirection: "column", transition: "opacity 1s", opacity: fadeIn && enter ? 0 : mounted ? 1 : 0, ...style }}
                >
                    <div
                        className="lingo3d-flexcenter"
                        style={{
                            gap: 10,
                            background: "rgba(0, 0, 0, 0.5)",
                            padding: 2
                        }}
                    >
                        {/*// @ts-ignore*/}
                        {children}
                    </div>
                </div>
            )}
        </Transition>
    )
}
