import * as React from "react";
import { render } from "react-dom";
import CurrencyInput from './CurrencyInput'

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