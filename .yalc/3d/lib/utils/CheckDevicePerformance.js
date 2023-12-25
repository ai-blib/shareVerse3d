let currentQuality = "medium"; // 默认中画质
class checkDevicePerformance {
    start = 0;
    end = 0;
    frameCount = 60;
    frameTimes = [];
    // @ts-ignore
    listenerEvent;
    tickStart() {
        this.start = performance.now();
    }
    tick() {
        const end = performance.now();
        const frameTime = end - this.start;
        this.frameTimes.push(frameTime);
        this.calculatePerformance();
    }
    calculatePerformance() {
        if (this.frameTimes.length >= this.frameCount) {
            const averageFrameTime = this.frameTimes.reduce((sum, value) => sum + value, 0) /
                this.frameCount;
            // 根据平均帧时间来判断设备性能，选择画质级别
            if (averageFrameTime < 16) {
                currentQuality = "high";
            }
            else if (averageFrameTime < 50) {
                currentQuality = "medium";
            }
            else {
                currentQuality = "low";
            }
            this.listenerEvent && this.listenerEvent(currentQuality);
            // console.log(averageFrameTime, 'currentQuality', currentQuality);
            this.frameTimes.length = 0;
            this.frameCount = 120;
        }
    }
    addEventListener(fn) {
        this.listenerEvent = fn;
    }
}
export default new checkDevicePerformance();
//# sourceMappingURL=CheckDevicePerformance.js.map