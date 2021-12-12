var fs = require('fs');

const getInput = () => {
    const file = fs.readFileSync('input.txt', 'utf8');
    const raw = file.split('\r\n');
    const inputStr = raw.map(x => x.split(''));
    const input = inputStr.map(x => x.map(y => parseInt(y)));


    return input;
}

const mostCommonBit = (input) => {
    let results = [0,0,0,0,0,0,0,0,0,0,0,0];
    input.forEach(byte => {
        for (let i = 0; i < byte.length; i++) {
            
            results[i] += byte[i];
        }
    });

    result=[];

    results.forEach(bit => {
        bit = (bit / input.length > 0.5) ? 1 : 0;
        result.push(bit);
    })

    console.log(results);
    console.log(input.length);
    console.log(result.join(''));
    return result;
}

const parseBinarryFromArray = (input) => {
    const binaryString = input.join('');
    const binary = parseInt(binaryString, 2);
    return binary;
}

const XORValue = (input) => {
    return input ^ parseInt("111111111111",2);
}

const main = () => {
    const input = getInput();
    const result = mostCommonBit(input);
    const binary = parseBinarryFromArray(result);
    const xor = XORValue(binary);
    console.log(binary, xor, xor*binary);
    
}

main();