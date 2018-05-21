import * as React from "react";
import { IPastedSymbols } from "./models";
import { separateNumber } from "./utils";

interface IProps {
    delimeter?: string;
    onChange: (value: string) => void;
}

interface IState {
    value: string;
    pastedSymbols: IPastedSymbols[];
}

class CurrencyInput extends React.Component<IProps, IState> {
    keyPress?: number;
    focusPostion?: number;

    static defaultProps: Partial<IProps> = {
        delimeter: " "
    };

    state = {
        value: "",
        pastedSymbols: null
    };

    changeCurrentPositon = (number: number): void => {
        console.log(number);
        this.focusPostion = this.focusPostion ? this.focusPostion + number : null;
    };

    removeDelimetr = (target: any): string => {
        const { value, selectionStart } = target;
        const { pastedSymbols } = this.state;
        if (!pastedSymbols) return value;

        let newValue = value;

        if (pastedSymbols.find(({ index }) => selectionStart === index)) {
            if (this.keyPress === 8) {
                newValue =
                    value.slice(0, selectionStart - 1) + value.slice(selectionStart);
                //this.changeCurrentPositon(-1);
            }
        }

        return newValue;
    };

    getPrevFocusPostion = (): number => {
        return this.focusPostion + (this.keyPress === 8 ? 1 : -1);
    };

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
            value => value.index + 1 <= this.focusPostion
        ).length;
        // Сколько символов было перед focus-ом в предыдущем состоянии.
        const prev = pastedSymbols.filter(
            value => value.index + 1 <= this.getPrevFocusPostion()
        ).length;

        console.log("next - prev", newSymbols, pastedSymbols, this.focusPostion);
        this.changeCurrentPositon(next - prev);
    };

    clearValue = (value, delimeter) => {
        let newValue = "";

        for (let i = 0; value.length > i; i++) {
            newValue += value[i] === delimeter ? "" : value[i];
        }

        return newValue;
    };

    handleChange = (e: any): void => {
        const target = e.target;
        const { delimeter, onChange } = this.props;
        const formatedValue = this.removeDelimetr(target);
        const { value, pastedSymbols } = separateNumber(
            this.clearValue(formatedValue.toString(), delimeter),
            delimeter
        );

        // Пересчет позиции фокуса.
        this.focusPostion = target.selectionStart;
        this.recountFocus(pastedSymbols);

        this.setState(
            {
                value,
                pastedSymbols
            },
            () => {
                target.selectionStart = this.focusPostion;
                target.selectionEnd = this.focusPostion;
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
