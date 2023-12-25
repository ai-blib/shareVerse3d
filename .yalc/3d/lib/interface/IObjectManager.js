import { physicsObjectManagerDefaults, physicsObjectManagerSchema } from './IPhysicsObjectManager';
import { hideSchema } from './utils/nonEditorSchemaSet';
import { extendDefaults } from './utils/Defaults';
import Range from './utils/Range';
// @ts-ignore
export const objectManagerSchema = {
    ...physicsObjectManagerSchema,
    innerRotationX: Number,
    innerRotationY: Number,
    innerRotationZ: Number,
    innerRotation: Number,
    innerX: Number,
    innerY: Number,
    innerZ: Number,
    firstInnerY: Number,
    firstInnerX: Number,
    firstInnerZ: Number,
    width: Number,
    height: Number,
    depth: Number,
    innerVisible: Boolean
};
hideSchema(['innerRotation']);
export const objectManagerDefaults = extendDefaults([physicsObjectManagerDefaults], {
    innerRotationX: 0,
    innerRotationY: 0,
    innerRotationZ: 0,
    innerRotation: 0,
    innerX: 0,
    innerY: 0,
    innerZ: 0,
    firstInnerY: 0,
    firstInnerX: 0,
    firstInnerZ: 0,
    width: 100,
    height: 100,
    depth: 100,
    playAllAnimation: false,
    innerVisible: true
}, {
    innerRotation: new Range(0, 360),
    innerRotationX: new Range(0, 360),
    innerRotationY: new Range(0, 360),
    innerRotationZ: new Range(0, 360),
    innerX: new Range(-1000, 1000),
    innerY: new Range(-1000, 1000),
    innerZ: new Range(-1000, 1000),
    width: new Range(0, 1000),
    height: new Range(0, 1000),
    depth: new Range(0, 1000)
});
//# sourceMappingURL=IObjectManager.js.map