const nonEditorSchemaSet = new Set();
export default nonEditorSchemaSet;
export const hideSchema = (props) => {
    for (const prop of props)
        nonEditorSchemaSet.add(prop);
};
//# sourceMappingURL=nonEditorSchemaSet.js.map