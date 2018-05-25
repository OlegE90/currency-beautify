/// <reference types="react" />
import * as React from "react";
import { IPastedSymbols } from "./models";
/**
 * @prop {string} [delimiter].
 * @prop {Function} onChange.
 */
export interface IProps {
    delimiter?: string;
    onChange: (value: string) => void;
}
/**
 * @prop {string} value.
 * @prop {IPastedSymbols[]} pastedSymbols.
 */
export interface IState {
    value: string;
    pastedSymbols: IPastedSymbols[];
}
declare class CurrencyInput extends React.Component<IProps, IState> {
    keyPress?: number;
    focusPosition?: number;
    static defaultProps: Partial<IProps>;
    state: {
        value: string;
        pastedSymbols: any;
    };
    changeCurrentPosition: (number: number) => void;
    removeDelimiter: (target: any) => string;
    getPrevFocusPosition: () => number;
    recountFocus: (newSymbols: IPastedSymbols[]) => void;
    clearValue: (value: any, delimiter: any) => string;
    handleChange: (e: any) => void;
    handleKeyDown: (e: any) => void;
    render(): JSX.Element;
}
export default CurrencyInput;
