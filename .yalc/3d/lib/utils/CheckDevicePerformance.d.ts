export type QualityType = "medium" | "low" | "high";
declare class checkDevicePerformance {
    start: number;
    end: number;
    frameCount: number;
    frameTimes: Array<number>;
    listenerEvent: (currentQuality: QualityType) => void;
    tickStart(): void;
    tick(): void;
    calculatePerformance(): void;
    addEventListener(fn: (type: QualityType) => void): void;
}
declare const _default: checkDevicePerformance;
export default _default;
