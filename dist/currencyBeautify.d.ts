import { IPastedSymbols } from "./models";
/**
 * @prop {string} delimiter
 */
export interface IParams {
    delimiter: string;
}
/**
 * @prop {number} focusPosition
 * @prop {number} keyPress
 * @prop {IPastedSymbols[]} pastedSymbols
 */
export interface IState {
    focusPosition: number;
    keyPress: number;
    pastedSymbols: IPastedSymbols[];
}
/**
 * @prop {string} value
 * @prop {number} focusPosition
 */
export interface IResult {
    value: string;
    focusPosition: number;
}
/**
 * @prop {string} value
 * @prop {number} keyPress
 * @prop {number} focusPosition
 */
export interface IRecountParams {
    value: string;
    focusPosition: number;
    keyPress: number;
}
export default class  {
    params: IParams;
    state: IState;
    constructor(params: any);
    changeCurrentPosition: (number: number) => void;
    getPrevFocusPosition: () => number;
    recountFocus: (newSymbols: IPastedSymbols[]) => void;
    removeDelimiter: (value: string, focusPosition: number, keyPress: number) => string;
    removeDelimiters: (value: string, delimiter: string) => string;
    recount: ({ value: _value, keyPress, focusPosition }: IRecountParams) => IResult;
}
