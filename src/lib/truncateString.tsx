export const truncateString = (string: string, maxLength: number): any => {
    if(string.length < maxLength) return string + "...";
    const result = [];
    for(let i = 0; i < maxLength; i++){
        result.push(string[i]);
        if(i === maxLength - 1) result.push("...");
    }
    return result.join("");   
}