import ITexturedStandard from "../../../interface/ITexturedStandard";
import TexturedBasicMixin from "./TexturedBasicMixin";
declare abstract class TexturedStandardMixin extends TexturedBasicMixin {
}
interface TexturedStandardMixin extends TexturedBasicMixin, ITexturedStandard {
}
export default TexturedStandardMixin;
