import { IPastedSymbols } from "./models";

/*
 * Разбивает цифру на группы из трех чисел.
 *
 * value {string} Цифра которую нужно разбить.
 * delimeter {string} Разделитель.
 */
export const separateNumber: {
    value: string;
    pastedSymbols: IPastedSymbols[];
} = (value: string, delimeter: string) => {
    const length = value.length;
    let iterator = 0;
    let result = "";
    let pastedSymbols: IPastedSymbols[] = [];

    while (length > iterator) {
        let currentPosition = length - 1 - iterator;
        let pastedSymbol = iterator > 0 && iterator % 3 === 0 ? delimeter : "";
        pastedSymbol &&
        pastedSymbols.push({
            symbol: pastedSymbol,
            index: iterator + 1 + pastedSymbols.length
        });

        result = value[currentPosition] + pastedSymbol + result;
        iterator++;
    }

    pastedSymbols = pastedSymbols.map(value => ({
        ...value,
        index: result.length - value.index
    }));

    //console.log(pastedSymbols);
    return { value: result, pastedSymbols };
};
