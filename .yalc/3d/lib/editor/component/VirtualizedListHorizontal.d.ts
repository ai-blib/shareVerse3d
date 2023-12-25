import { valueof } from "@lincode/utils";
import { Signal } from "@preact/signals";
import { CSSProperties } from "preact/compat";
interface VirtualizedListHorizontalProps<T extends Array<any>> {
    data?: T;
    itemNum?: number;
    itemWidth: number;
    containerWidth: number;
    containerHeight: number;
    RenderComponent: (data: {
        index: number;
        style: CSSProperties;
        data: valueof<T>;
    }) => any;
    scrollSignal: Signal<number>;
    style?: CSSProperties;
}
declare const VirtualizedListHorizontal: <T extends any[]>({ data, itemNum, itemWidth, containerWidth, containerHeight, RenderComponent, scrollSignal, style }: VirtualizedListHorizontalProps<T>) => import("preact/compat").JSX.Element;
export default VirtualizedListHorizontal;
