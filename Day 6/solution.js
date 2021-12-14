var fs = require('fs');

const getInput = () => {
    const file = fs.readFileSync('test.txt', 'utf8');
    const input = file.split(',').map(Number);
    
    return input;
}

const nextDay = (input) => {
    let newFish = [];
    for (let i = 0; i < input.length; i++) {
        input[i]--
        if (input[i] < 0) {
            newFish.push(8); 
            input[i] = 6;
        }
    }
    input.push(...newFish);
}

const main = () => {
    const inputs = getInput();
    let total = 0;
    
    for (let i = 0; i < 18; i++) {
        nextDay(inputs);
    }
    
    console.log(inputs.length);
}

main();