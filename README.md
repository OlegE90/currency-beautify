Currency Beautify.
===============

### Install

Via NPM
```
npm i --save currency-beautify
```

### Instruction

```
import CurrencyBeautify from "currency-beautify";


const currencyCounter = new CurrencyBeautify({ delimiter: props.delimiter });

const { value, focusPosition } = this.currencyCounter.recount({
            value: target.value, // Current value
            focusPosition: target.selectionStart, //Focus position
            keyPress: this.keyPress // Key which has been pressed
        });

```

How it's work - https://codesandbox.io/s/p5nol7rw5q

License
=
[MIT](https://github.com/smirzaei/currency-formatter/blob/master/LICENSE)