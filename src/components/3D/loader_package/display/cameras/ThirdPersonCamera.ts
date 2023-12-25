import { createEffect, Reactive } from '@lincode/reactivity';
import mainCamera from '../../engine/mainCamera';
import { onBeforeCameraLoop } from '../../events/onBeforeCameraLoop';
import { onBeforeRender } from '../../events/onBeforeRender';
import IThirdPersonCamera, {
	thirdPersonCameraDefaults,
	thirdPersonCameraSchema
} from '../../interface/IThirdPersonCamera';
import { getCameraRendered } from '../../states/useCameraRendered';
import { getEditorMounted } from '../../states/useEditorMounted';
import { getEditorPlay } from '../../states/useEditorPlay';
import CharacterCamera from '../core/CharacterCamera';
import MeshItem from '../core/MeshItem';
import { bvhCameraSet } from '../core/PhysicsObjectManager/bvh/bvhCameraSet';
import fpsAlpha from '../utils/fpsAlpha';
import getWorldPosition from '../utils/getWorldPosition';
import getWorldQuaternion from '../utils/getWorldQuaternion';
import { getTransformControlsDragging } from '../../states/useTransformControlsDragging';
import { Cancellable } from '@lincode/promiselikes';
import { container } from '../../engine/renderLoop/renderSetup';
import { vec2Point } from '../../display/utils/vec2Point';
import { onKeyClear } from '../../events/onKeyClear';

const setVisible = (target: MeshItem, visible: boolean) => {
	'visible' in target && (target.visible = visible);
};

let alwaysVisible = false;

createEffect(() => {
	alwaysVisible = !getEditorPlay() || (getEditorMounted() && getCameraRendered() === mainCamera);
}, [getEditorMounted, getEditorMounted, getCameraRendered]);

export default class ThirdPersonCamera extends CharacterCamera implements IThirdPersonCamera {
	public static componentName = 'thirdPersonCamera';
	public static override defaults = thirdPersonCameraDefaults;
	public static override schema = thirdPersonCameraSchema;

	public constructor() {
		super();
		this.innerZ = 300;
		this.orbitMode = true;

		const cam = this.camera;

		import('../core/PhysicsObjectManager/bvh/bvhCameraLoop').then(() => {
			this.createEffect(() => {
				const found = this.foundState.get();
				if (!found) {
					const handle = onBeforeRender(() => {
						cam.position.copy(getWorldPosition(this.object3d));
						cam.quaternion.copy(getWorldQuaternion(this.object3d));
					});
					return () => {
						handle.cancel();
					};
				}

				// bvhCameraSet.add(cam);

				let tooCloseOld = true;
				setVisible(found, !tooCloseOld);

				let first = true;
				const handle = onBeforeCameraLoop(() => {
					const origin = getWorldPosition(this.outerObject3d);
					const camPos = getWorldPosition(this.object3d);
					const dist = camPos.distanceTo(origin);

					cam.position.lerp(camPos, first ? 1 : fpsAlpha(0.1));
					const ratio = first ? 1 : cam.position.distanceTo(origin) / dist;
					// cam.position.lerpVectors(origin, camPos, ratio);

					cam.quaternion.copy(getWorldQuaternion(this.object3d));

					const tooClose = alwaysVisible ? false : ratio < 0.35;
					tooClose !== tooCloseOld && setVisible(found, !tooClose);
					tooCloseOld = tooClose;

					first = false;
				});
				return () => {
					handle.cancel();
					// bvhCameraSet.delete(cam);
				};
			}, [this.foundState.get]);
		});

		this.createEffect(() => {
			if (getTransformControlsDragging() || getCameraRendered() !== cam || !this.mouseControlState.get()) return;

			const handle = new Cancellable();

			if (this.enableZoomState.get()) {
				const cb = (e: WheelEvent) => {
					e.preventDefault();
					// console.log(e,'e')
					if (this.innerZ < 1900 && this.innerZ > 10) {
						this.innerZ += e.deltaY;
					}
					if (this.innerZ >= 1900) {
						this.innerZ = 1800;
					}
					if (this.innerZ <= 80) {
						this.innerZ = 90;
					}
					if (this.innerZ < 0) this.innerZ = 0;
				};
				container.addEventListener('wheel', cb);
				handle.then(() => container.removeEventListener('wheel', cb));
			}

			return () => {
				handle.cancel();
			};
		}, [getCameraRendered, getTransformControlsDragging, this.enableZoomState.get, this.mouseControlState.get]);
	}

	private enableZoomState = new Reactive(true);

	public get enableZoom() {
		return this.enableZoomState.get();
	}

	public set enableZoom(val) {
		this.enableZoomState.set(val);
	}
}
