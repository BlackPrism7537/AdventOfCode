var fs = require('fs');

const getInput = () => {
    const file = fs.readFileSync('input.txt', 'utf8');
    const raw = file.split('\n');
    const input = raw.map(x => x.split(' '));

    return input;
}

const parse = (input) => {
    let dist = 0;
    let depth = 0;

    for (let i = 0; i < input.length; i++) {
        switch (input[i][0]) {
            case 'forward':
                dist += parseInt(input[i][1]);
                break;
            case 'up':
                depth -= parseInt(input[i][1]);
                break;
            case 'down':
                depth += parseInt(input[i][1]);
                break;
            default:
                break;
        }
    }

    return (depth*dist)
}


const parse2 = (input) => {
    let aim = 0;
    let dist = 0;
    let depth = 0;

    for (let i = 0; i < input.length; i++) {
        switch (input[i][0]) {
            case 'forward':
                dist += parseInt(input[i][1]);
                depth += aim * parseInt(input[i][1]);
                break;
            case 'up':
                //depth -= parseInt(input[i][1]);
                aim -= parseInt(input[i][1]);
                break;
            case 'down':
                //depth += parseInt(input[i][1]);
                aim += parseInt(input[i][1]);
                break;
            default:
                break;
        }

        //console.log(dist, depth, aim);
    }

    return (depth*dist)
}


const main = () => {
    const input = getInput();
    console.log(parse(input));
    console.log(parse2(input));
}

main();