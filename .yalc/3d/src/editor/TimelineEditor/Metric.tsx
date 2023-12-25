// @ts-nocheck
import { CSSProperties, memo } from "preact/compat"
import { FRAME2SEC, FRAME_WIDTH } from "../../globals"

const round = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100

type MetricProps = {
    index: number
    style: CSSProperties
}

const Metric = ({ index, style }: MetricProps) => {
    const rounded = round(index * 5 * FRAME2SEC)
    const showSeconds = (rounded * 100) % 5 === 0

    return (
        <div style={style}>
            <div
                style={{
                    opacity: showSeconds ? 0.75 : 0.65,
                    marginLeft: FRAME_WIDTH * 0.5
                }}
            >
                <div style={{ display: "flex", fontSize: 10 }}>
                    <div
                        style={{
                            width: 1,
                            marginRight: 2,
                            height: showSeconds ? 16 : 12,
                            background: "white"
                        }}
                    />
                    {index * 5}
                </div>
                {showSeconds && (
                    <div style={{ fontSize: 9, opacity: 0.5 }}>{rounded}s</div>
                )}
            </div>
        </div>
    )
}

export default memo(Metric, () => true)
