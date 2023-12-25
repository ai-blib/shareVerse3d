import { valueof } from "@lincode/utils";
import { Signal } from "@preact/signals";
import { CSSProperties } from "preact/compat";
interface VirtualizedListProps<T extends Array<any>> {
    data?: T;
    itemNum?: number;
    itemHeight: number;
    containerWidth: number;
    containerHeight: number;
    RenderComponent: (data: {
        index: number;
        style: CSSProperties;
        data: valueof<T>;
    }) => any;
    scrollSignal?: Signal<number>;
    style?: CSSProperties;
}
declare const VirtualizedList: <T extends any[]>({ data, itemNum, itemHeight, containerWidth, containerHeight, RenderComponent, scrollSignal, style }: VirtualizedListProps<T>) => import("preact/compat").JSX.Element;
export default VirtualizedList;
