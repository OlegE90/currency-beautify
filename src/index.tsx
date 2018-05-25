import * as React from "react";
import { render } from "react-dom";
import CurrencyBeautify from "./currencyBeautify";

/**
 * @prop {string} [delimiter].
 * @prop {object} [regExp].
 * @prop {Function} onChange.
 */
export interface IProps {
    delimiter?: string;
    regExp?: RegExp;
    onChange: (value: string) => void;
}

export interface IState {
    value: string;
}

class CurrencyInput extends React.Component<IProps, IState> {
    keyPress?: number;
    currencyCounter: any = null;

    static defaultProps: Partial<IProps> = {
        delimiter: " ",
        regExp: /[0-9]/
    };

    state = {
        value: ""
    };

    constructor (props) {
        super(props);
        this.currencyCounter = new CurrencyBeautify({ delimiter: props.delimiter })

    }

    removeNotAvailableSymbol = (value: string): string => {
        const { regExp } = this.props;

        if (!regExp || !value) return value;

        const isAvailableSymbol = !!((value[value.length - 1].match(regExp) || []).length);

        return isAvailableSymbol ? value : value.slice(0, value.length - 1);
    };

    handleChange = (e: any): void => {
        const target = e.target;
        const { onChange, delimiter } = this.props;
        let _value = this.removeNotAvailableSymbol(target.value);

        const { value, focusPosition } = this.currencyCounter.recount({
            value: _value,
            delimiter,
            focusPosition: target.selectionStart,
            keyPress: this.keyPress
        });

        this.setState(
            { value },
            () => {
                target.selectionStart = focusPosition;
                target.selectionEnd = focusPosition;
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

class App extends React.Component<{}, {}> {
    handleChange = (value: string) => {
       // console.log(value);
    };

    render() {
        return (
            <div>
                <CurrencyInput delimiter=" " onChange={this.handleChange} />
            </div>
        );
    };
}

render(<App />, document.getElementById("root"));