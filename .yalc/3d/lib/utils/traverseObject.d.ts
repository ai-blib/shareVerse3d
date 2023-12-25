declare const traverseObject: (obj: unknown, cb: (k: string, v: any, parent: Record<any, any> | Array<any>, path: Array<string>) => void, traversed?: WeakSet<object>, currentPath?: Array<string>) => void;
export default traverseObject;
