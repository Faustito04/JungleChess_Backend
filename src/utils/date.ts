export const getCurrDate = () => {
    const date = new Date();

    return `${date.getFullYear()}-${addZeroes(date.getMonth().toString(), 2)}-${addZeroes(date.getDate().toString(), 2)} ${addZeroes(date.getHours().toString(), 2)}:${addZeroes(date.getMinutes().toString(), 2)}:${addZeroes(date.getSeconds().toString(), 2)}`;
};

const addZeroes = (str: string, length: number) => {
    while(str.length < length) str = `0${str}`;
    return str;
};