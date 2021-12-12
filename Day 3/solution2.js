var fs = require('fs');

const getInput = () => {
    const file = fs.readFileSync('input.txt', 'utf8');
    const raw = file.split('\r\n');
    const inputStr = raw.map(x => x.split(''));
    const input = inputStr.map(x => x.map(y => parseInt(y)));


    return input;
}

const mostCommonBit = (input, index) => {
    let total = 0;
    input.forEach(byte => {
        total += byte[index];
    });

    return ((total / input.length >= 0.5) ? 1 : 0);

}

const findMostCommon = (input) => {
    for (let i = 0; i < input[0].length; i++) {
        let bit = mostCommonBit(input, i);
        input = input.filter(byte => (byte[i] === bit));
        if (input.length === 1) break;
    }
    console.log(input);
    return parseInt(input[0].join(''), 2);
}

const leastCommonBit = (input, index) => {
    let total = 0;
    input.forEach(byte => {
        total += byte[index];
    });

    return ((total / input.length >= 0.5) ? 0 : 1);

}

const findLeastCommon = (input) => {
    for (let i = 0; i < input[0].length; i++) {
        let bit = leastCommonBit(input, i);
        input = input.filter(byte => (byte[i] === bit));
        if (input.length === 1) break
    }

    console.log(input);
    return parseInt(input[0].join(''), 2);
}

const main = () => {
    const input = getInput();

    const val = findMostCommon(input);
    
    const val2 = findLeastCommon(input);
    
    console.log(val, val2, val * val2);
}

main();