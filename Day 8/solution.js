var fs = require('fs');

const getInput = () => {
    const file = fs.readFileSync('test.txt', 'utf8');
    let lines = file.split('\r\n');
    return lines.map(line => line.split(' | ').map(word => word.split(' ')));
}

const getValues = (input) => {
    let total = 0;
    for (let i = 0; i < input.length; i++) {
        //console.log(input[i].length);
        switch (input[i].length) {
            case 2:
                total ++;
                break;
            case 3:
                total ++;
                break;
            case 4:
                total ++;
                break;
            case 7:
                total ++;
                break;
            default:
                break;
        }
    }
    return total;
}

const main = () => {
    const input = getInput();
    let total = 0;
    for (let i = 0; i < input.length; i++) {
        total += getValues(input[i][1]);
    }
    console.log(total);
}

main();