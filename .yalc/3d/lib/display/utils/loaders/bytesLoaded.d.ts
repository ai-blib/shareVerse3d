declare const bytesLoaded: number[];
export declare const addLoadedBytesChangedEventListeners: (listener: (bytes: number) => void) => void;
export declare const removeLoadedBytesChangedEventListeners: (listener: (bytes: number) => void) => void;
export default bytesLoaded;
export declare const handleProgress: (url: string) => (e: {
    loaded: number;
    total: number;
}) => void;
