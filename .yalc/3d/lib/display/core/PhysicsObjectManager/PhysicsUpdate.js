export default class PhysicsUpdate {
    x = false;
    y = false;
    z = false;
    updateX() {
        this.x = true;
    }
    updateY() {
        this.x = true;
    }
    updateZ() {
        this.x = true;
    }
    updateXYZ() {
        this.x = this.y = this.z = true;
    }
    updateXZ() {
        this.x = this.z = true;
    }
    reset() {
        this.x = this.y = this.z = false;
    }
}
//# sourceMappingURL=PhysicsUpdate.js.map