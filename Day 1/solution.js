var fs = require('fs');

const getInput = () => {
    const file = fs.readFileSync('input-1.txt', 'utf8');
    const raw = file.split('\n');
    const input = raw.map(Number);
    return input;
}

const checkIncrease = (input) => {
    let count = 0;
    for (let i = 1; i < input.length; i++) {
        input[i] > input[i - 1] ? count++ : count;
    }
    return count;
}

const checkSlidingWindow = (input) => {
    let count = 0;
    for (let i = 0; i < input.length - 3; i++) {
        const a = input[i] + input[i + 1] + input[i + 2];
        const b = input[i + 1] + input[i + 2] + input[i + 3];
        a < b ? count++ : count;

    }
    return count;
}

const main = () => {
    const input = getInput();

    //part 1
    const result = checkIncrease(input);
    console.log("increases: " + result);

    //part 2
    const result2 = checkSlidingWindow(input);
    console.log("sliding window: " + result2);
}

main();