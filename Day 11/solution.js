const fs = require('fs');

const getInput = () => {
    const input = fs.readFileSync('input.txt', 'utf8');
    return input.split('\r\n');
};

const main = () => {
    const input = getInput();
    console.log(input);
}

main();