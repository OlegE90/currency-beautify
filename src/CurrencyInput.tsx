import * as React from "react";
import { IPastedSymbols } from "./models";
import { separateNumber } from "./utils";

/**
 * @prop {string} [delimiter].
 * @prop {object} [regExp].
 * @prop {Function} onChange.
 */
export interface IProps {
    delimiter?: string;
    regExp?: object;
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

class CurrencyInput extends React.Component<IProps, IState> {
    keyPress?: number;
    focusPosition?: number;

    static defaultProps: Partial<IProps> = {
        delimiter: " ",
        regExp: /[0-9]/
    };

    state = {
        value: "",
        pastedSymbols: null
    };

    changeCurrentPosition = (number: number): void => {
        console.log(number);
        this.focusPosition = this.focusPosition ? this.focusPosition + number : null;
    };

    removeDelimiter = (value: string, focusPosition: number): string => {
        const { pastedSymbols } = this.state;
        if (!pastedSymbols) return value;

        let newValue = value;

        if (pastedSymbols.find(({ index }) => focusPosition === index)) {
            if (this.keyPress === 8) {
                newValue = value.slice(0, focusPosition - 1) + value.slice(focusPosition);
                //this.changeCurrentPosition(-1);
            }
        }

        return newValue;
    };

    getPrevFocusPosition = (): number => this.focusPosition + (this.keyPress === 8 ? 1 : -1);

    recountFocus = (newSymbols: IPastedSymbols[]): void => {
        const { pastedSymbols } = this.state;
        if (
            !newSymbols ||
            !pastedSymbols ||
            newSymbols.length === pastedSymbols.length
        )
            return;

        // Сколько символов перед focus-ом в текущем состоянии.
        const next = newSymbols.filter(
            value => value.index + 1 <= this.focusPosition
        ).length;
        // Сколько символов было перед focus-ом в предыдущем состоянии.
        const prev = pastedSymbols.filter(
            value => value.index + 1 <= this.getPrevFocusPosition()
        ).length;

        console.log("next - prev", newSymbols, pastedSymbols, this.focusPosition);
        this.changeCurrentPosition(next - prev);
    };

    removeNotAvailableSymbol = (value) => {
        const { regExp } = this.props;

        if (!regExp) return;

        const isAvailableSymbol = !!((value[value.length - 1].match(regExp) || []).length);

        return isAvailableSymbol ? value : value.slice(0, value.length - 1);
    };

    clearValue = (value, delimiter): string => {
        let newValue = "";

        for (let i = 0; value.length > i; i++) {
            newValue += value[i] === delimiter ? "" : value[i];
        }

        return newValue;
    };

    handleChange = (e: any): void => {
        const target = e.target;
        const { delimiter, onChange } = this.props;
        let _value = this.removeNotAvailableSymbol(target.value);

        const formattedValue = this.removeDelimiter(_value, target.selectionStart);
        const cleanValue = this.clearValue(formattedValue.toString(), delimiter);
        const { value, pastedSymbols } = separateNumber(cleanValue, delimiter);

        // Пересчет позиции фокуса.
        this.focusPosition = target.selectionStart;
        this.recountFocus(pastedSymbols);

        this.setState(
            {
                value,
                pastedSymbols
            },
            () => {
                target.selectionStart = this.focusPosition;
                target.selectionEnd = this.focusPosition;
                onChange(value);
            }
        );
    };

    handleKeyDown = (e: any): void => {
        this.keyPress = e.keyCode;
    };

    render() {
        const { value } = this.state;

        return (
            <div>
                <input
                    value={value}
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default CurrencyInput;
