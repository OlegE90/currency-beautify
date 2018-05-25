import { IPastedSymbols } from "./models";

export interface IResult {
    value: string;
    pastedSymbols: IPastedSymbols[];
}

/*
 * Разбивает цифру на группы из трех чисел.
 *
 * value {string} Цифра которую нужно разбить.
 * delimiter {string} Разделитель.
 */
export const separateNumber = (value: string, delimiter: string): IResult => {
    const length = value.length;
    let iterator = 0;
    let result = "";
    let pastedSymbols: IPastedSymbols[] = [];

    while (length > iterator) {
        let currentPosition = length - 1 - iterator;
        let pastedSymbol = iterator > 0 && iterator % 3 === 0 ? delimiter : "";
        pastedSymbol &&
        pastedSymbols.push({
            symbol: pastedSymbol,
            index: iterator + 1 + pastedSymbols.length
        });

        result = value[currentPosition] + pastedSymbol + result;
        iterator++;
    }

    pastedSymbols = pastedSymbols.map(item => ({
        ...item,
        index: result.length - item.index
    }));


    return { value: result, pastedSymbols };
};
