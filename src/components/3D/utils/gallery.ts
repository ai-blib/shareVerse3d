let ladyIndex = 0;
let manIndex = 0;
const lady = () => {
    let Array: Array<string> = [];
    for (let i = 1; i < 13; i++) {
        const f = `f_${(i)}`;
        Array.push(f);
    }
    return Array;
};
const man = () => {
    let Array: Array<string> = [];
    for (let i = 1; i < 14; i++) {
        const f = `m_${(i)}`;
        Array.push(f);
    }
    return Array;
};
export const personLadtModel = [...lady()];
export const personMantModel = [...man()];
export const getModelUrl = (gender: string, type: string): string => {

    if (gender === "female") {
        if (type === "next") {
            ladyIndex++;
        } else if (type === "pre") {
            ladyIndex--;
        }
        if (personLadtModel.length < ladyIndex + 1) {
            ladyIndex = 0;
        } else if (ladyIndex < 0) {
            ladyIndex = personLadtModel.length - 1;
        }
        return "https://d1ktb2pux2fae3.cloudfront.net/template/" + personLadtModel[ladyIndex] + ".json";
    } else if (gender === "male") {
        if (type === "next") {
            manIndex++;
        } else if (type === "pre") {
            ladyIndex--;
        }
        if (personMantModel.length < manIndex + 1) {
            manIndex = 0;
        } else if (manIndex < 0) {
            manIndex = personMantModel.length - 1;
        }
        return "https://d1ktb2pux2fae3.cloudfront.net/template/" + personMantModel[manIndex] + ".json";
    }
    return "";
};
