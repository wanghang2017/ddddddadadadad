export function arrayToStr(array) {
    let str = "";
    for (let i = 0; i < array.length; i++) {
        str += `["${array[i]}"]`;
    }
    return str;
}