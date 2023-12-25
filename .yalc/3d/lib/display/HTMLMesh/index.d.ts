import IHTMLMesh from "../../interface/IHTMLMesh";
import VisibleObjectManager from "../core/VisibleObjectManager";
export default class HTMLMesh extends VisibleObjectManager implements IHTMLMesh {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<IHTMLMesh>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<IHTMLMesh>>;
    constructor();
    private elementState;
    get element(): Element | undefined;
    set element(val: Element | undefined);
    private innerHTMLState;
    get innerHTML(): string | undefined;
    set innerHTML(val: string | undefined);
    private spriteState;
    get sprite(): boolean;
    set sprite(val: boolean);
    private cssColorState;
    get cssColor(): string;
    set cssColor(val: string);
}
