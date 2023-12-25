import { ComponentChildren } from "preact";
type SectionOptions = {
    children?: ComponentChildren;
};
declare const Section: ({ children }: SectionOptions) => import("preact").JSX.Element | null;
export default Section;
