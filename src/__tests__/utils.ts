import { separateNumber } from '../utils'

test('test separateNumber', async () => {
    const millionResult = {
        pastedSymbols: [{"index": 6, "symbol": ","}, {"index": 2, "symbol": ","}],
        value: "10,000,000"
    };
    const tenResult = {
        pastedSymbols: [],
        value: "10"
    };

    expect(separateNumber('10000000', ',')).toEqual(millionResult);
    expect(separateNumber('10', ',')).toEqual(tenResult);
});
