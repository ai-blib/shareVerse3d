export default class Choices<T> {
    options: Record<string, T>;
    constructor(options: Record<string, T>);
}
