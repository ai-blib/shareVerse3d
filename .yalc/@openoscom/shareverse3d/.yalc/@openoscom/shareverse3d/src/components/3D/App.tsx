import {
    Dummy,
    Model,
    Reflector,
    SvgMesh,
    ThirdPersonCamera,
    World,
    usePreload,
    Audio,
    OrbitCamera
} from "./index"
import { useState } from "react"

// Game world component
// 场景组件
const Game = () => {
    // When user clicks on map model, set arrow position to clicked position
    // 点击地图模型时，设置箭头位置为点击位置
    const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0, z: 0 })

    // When user clicks on map model, set running to true
    // 点击地图模型时，设置跑步为true
    const [running, setRunning] = useState(false)

    return (
        // World has white fog, environment image based lighting, and bloom effect
        // 场景有基于图片的环境光照，并且有泛光效果
        <World defaultLight="env.jpg"  bloomThreshold={0.5}>
            {/* Map model; when clicked, set arrow position and running state */}
            {/* 地图模型，点击时设置箭头位置以及跑步状态 */}
            <Model
                physics="map"
                bloom={true}
                scale={10}
                y={undefined}
                src="https://d1ktb2pux2fae3.cloudfront.net/template/cyberRoom-v1.glb"
                onClick={(e:any) => {
                    setArrowPosition(e.point)
                    setRunning(true)
                }}
            >
                {/*<Model*/}
                {/*    src={'sky.glb'}*/}
                {/*    physics="map"*/}
                {/*    scale={4}*/}
                {/*    x={0}*/}
                {/*    y={0}*/}
                {/*    z={0}*/}
                {/*/>*/}
            </Model>
            <Model
                physics="map"
                bloom={true}
                scale={10}
                y={undefined}
                src="https://d1ktb2pux2fae3.cloudfront.net/template/cyberRoom-v1.glb"
                onClick={(e:any) => {
                    setArrowPosition(e.point)
                    setRunning(true)
                }}
            >
                {/*<Model*/}
                {/*    src={'sky.glb'}*/}
                {/*    physics="map"*/}
                {/*    scale={4}*/}
                {/*    x={0}*/}
                {/*    y={0}*/}
                {/*    z={0}*/}
                {/*/>*/}
            </Model>
            {/* Ground reflection */}
            {/* 地面反射 */}

            {/* Character dummy, and the camera that follows it */}
            {/* 角色假人，以及跟随它的相机 */}
            <ThirdPersonCamera
                active
                mouseControl="drag"
                physics="map"
                lockTargetRotation={true}
                enableDamping
            >
                <Dummy
                    physics="map"
                    metalnessFactor={-2}
                    roughnessFactor={0}
                    y={0}
                    // 4 arguments of lookTo are: x, y, z, and alpha. Smaller alpha means slower speed.
                    // lookTo 的4个参数：x, y, z, 和 alpha。alpha 越小，速度越慢。
                    lookTo={[arrowPosition.x, undefined, arrowPosition.z, 0.1]}
                    // 4 arguments of moveTo: x, y, z, and speed.
                    // moveTo 的4个参数：x, y, z, 和速度。
                    moveTo={[arrowPosition.x, undefined, arrowPosition.z, 10]}
                    // When moveTo is finished, set running to false
                    // moveTo 完成后，设置跑步为false
                    onMoveToEnd={() => setRunning(false)}
                    // animation depends on running state
                    // 跑步状态决定动画
                    animation={running ? "running" : "idle"}
                >
                    {/* sound of footsteps that follows the dummy */}
                    {/* 跟随角色的脚步声 */}
                    <Audio
                        src="footsteps.wav"
                        autoplay
                        loop
                        stopped={!running}
                        playbackRate={2.5}
                    />
                </Dummy>
            </ThirdPersonCamera>
            {/*<OrbitCamera*/}
            {/*    fov={90}*/}
            {/*    active={true}*/}
            {/*    transition={0.02}*/}
            {/*    physics="map"*/}
            {/*    enableZoom*/}
            {/*    enableDamping*/}

            {/*/>*/}
            {/* When running, render an SVG arrow mesh */}
            {/* 当跑步时，渲染一个SVG箭头模型 */}
            {running && (
                <SvgMesh
                    src="arrow.svg"
                    bloom
                    roughness={0.4}
                    scaleZ={0.19}
                    color="#ff4e4e"
                    x={arrowPosition.x}
                    y={arrowPosition.y + 50}
                    z={arrowPosition.z}
                    animation={{ rotationY: [0, 45, 90, 135, 180, 225, 270, 315, 360] }}
                />
            )}
        </World>
    )
}

// App component renders preload progress
// App组件渲染预加载进度
const App = () => {


    return <Game />
}

export default App
