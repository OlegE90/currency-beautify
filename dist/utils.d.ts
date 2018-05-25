import { IPastedSymbols } from "./models";
export interface IResult {
    value: string;
    pastedSymbols: IPastedSymbols[];
}
export declare const separateNumber: (value: string, delimiter: string) => IResult;
