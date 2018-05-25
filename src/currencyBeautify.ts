import { separateNumber } from "./utils";
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

export default class {

    params: IParams = {
        delimiter: ' '
    };

    state: IState = {
        pastedSymbols: null,
        focusPosition: null,
        keyPress: null,
    };

    constructor (params) {
        this.params = params;
    }

    changeCurrentPosition = (number: number): void => {
        console.log(number);
        this.state.focusPosition = this.state.focusPosition ? this.state.focusPosition + number : null;
    };

    getPrevFocusPosition = (): number => this.state.focusPosition + (this.state.keyPress === 8 ? 1 : -1);

    recountFocus = (newSymbols: IPastedSymbols[]): void => {
        const { pastedSymbols, focusPosition } = this.state;
        if (!newSymbols || !pastedSymbols || newSymbols.length === pastedSymbols.length) return;

        // Сколько символов перед focus-ом в текущем состоянии.
        const next = newSymbols.filter(
            value => value.index + 1 <= focusPosition
        ).length;
        // Сколько символов было перед focus-ом в предыдущем состоянии.
        const prev = pastedSymbols.filter(
            value => value.index + 1 <= this.getPrevFocusPosition()
        ).length;

        console.log("next - prev", newSymbols, pastedSymbols, focusPosition);
        this.changeCurrentPosition(next - prev);
    };

    removeDelimiter = (value: string, focusPosition: number, keyPress: number): string => {
        const { pastedSymbols } = this.state;
        let newValue = value;

        if (!pastedSymbols) return newValue;


        if (pastedSymbols.find(({ index }) => focusPosition === index)) {
            if (keyPress === 8) {
                newValue = value.slice(0, focusPosition - 1) + value.slice(focusPosition);
                //this.changeCurrentPosition(-1);
            }
        }

        return newValue;
    };

    removeDelimiters = (value: string, delimiter: string): string => {
        let newValue = "";

        for (let i = 0; value.length > i; i++) {
            newValue += value[i] === delimiter ? "" : value[i];
        }

        return newValue;
    };

    recount = ({value: _value, keyPress, focusPosition}: IRecountParams): IResult => {
        const { delimiter } = this.params;
        const formattedValue = this.removeDelimiter(_value, focusPosition, keyPress);
        const cleanValue = this.removeDelimiters(formattedValue.toString(), delimiter);

        const { value, pastedSymbols } = separateNumber(cleanValue, delimiter);

        this.state.keyPress = keyPress;
        this.state.focusPosition = focusPosition;


        // Пересчет позиции фокуса.
        this.recountFocus(pastedSymbols);

        this.state.pastedSymbols = pastedSymbols;

        return {
            value,
            focusPosition: this.state.focusPosition
        };
    }
};
