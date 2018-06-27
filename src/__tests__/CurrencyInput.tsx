import * as React from "react";
import { Simulate } from "react-dom/test-utils";
import { render } from "react-testing-library";

import CurrencyInput from "../CurrencyInput"

const handleChange = (value: string) => {};


test('test currencyBeautifyReact on correct change', async () => {
    const { container } = render(<CurrencyInput delimiter=" " onChange={ handleChange } />);

    const input = container.querySelector('input');
    input.value = '1100000';

    Simulate.change(input);

    expect(input.value).toEqual('1 100 000');
});
