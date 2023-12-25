import { Reactive } from "@lincode/reactivity";
import { htmlMeshDefaults, htmlMeshSchema } from "../../interface/IHTMLMesh";
import createElement from "../../utils/createElement";
import { Cancellable } from "@lincode/promiselikes";
import VisibleObjectManager from "../core/VisibleObjectManager";
import { addSelectionHelper } from "../core/StaticObjectManager/raycast/selectionCandidates";
import HelperCube from "../core/utils/HelperCube";
import { setManager } from "../../api/utils/manager";
const elementContainerTemplate = createElement(`
    <div style="position: absolute; visibility: hidden; pointer-events: none;"></div>
`);
export default class HTMLMesh extends VisibleObjectManager {
    static componentName = "htmlMesh";
    static defaults = htmlMeshDefaults;
    static schema = htmlMeshSchema;
    constructor() {
        super();
        this.createEffect(() => {
            let element = this.elementState.get();
            const innerHTML = this.innerHTMLState.get();
            if (!element && innerHTML)
                element = createElement(innerHTML.startsWith("<")
                    ? innerHTML
                    : `<div>${innerHTML}</div>`);
            if (!element) {
                const helper = new HelperCube();
                const handle = addSelectionHelper(helper, this);
                return () => {
                    helper.dispose();
                    handle.cancel();
                };
            }
            const elementContainer = elementContainerTemplate.cloneNode();
            document.body.appendChild(elementContainer);
            elementContainer.appendChild(element);
            const handle = new Cancellable();
            import("./HTMLMesh").then(({ HTMLMesh, HTMLSprite }) => {
                if (handle.done)
                    return;
                const mesh = this.spriteState.get()
                    ? new HTMLSprite(element)
                    : new HTMLMesh(element);
                this.object3d.add(mesh);
                setManager(mesh, this);
                handle.watch(
                // @ts-ignore
                this.cssColorState.get((color) => {
                    elementContainer.style.color = color;
                    mesh.update();
                }));
                handle.then(() => {
                    this.object3d.remove(mesh);
                    mesh.dispose();
                });
            });
            return () => {
                elementContainer.remove();
                handle.cancel();
            };
        }, [
            this.elementState.get,
            this.spriteState.get,
            this.innerHTMLState.get
        ]);
    }
    elementState = new Reactive(undefined);
    get element() {
        return this.elementState.get();
    }
    set element(val) {
        this.elementState.set(val);
    }
    innerHTMLState = new Reactive(undefined);
    get innerHTML() {
        return this.innerHTMLState.get();
    }
    set innerHTML(val) {
        this.innerHTMLState.set(val);
    }
    spriteState = new Reactive(false);
    get sprite() {
        return this.spriteState.get();
    }
    set sprite(val) {
        this.spriteState.set(val);
    }
    cssColorState = new Reactive("#ffffff");
    get cssColor() {
        return this.cssColorState.get();
    }
    set cssColor(val) {
        this.cssColorState.set(val);
    }
}
//# sourceMappingURL=index.js.map