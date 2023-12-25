import { GameObjectType } from "../../api/serializer/types";
interface ObjectGroupProps {
    names: Array<GameObjectType | Partial<Record<GameObjectType, string>>>;
}
declare const ObjectGroup: ({ names }: ObjectGroupProps) => import("preact").JSX.Element;
export default ObjectGroup;
