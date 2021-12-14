var fs = require('fs');

const getInput = () => {
    const file = fs.readFileSync('input.txt', 'utf8');
    const input = file.split(',').map(Number);
    
    return input;
}

const getMean = (arr) => {
    return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
}

const getMedian = (arr) => {
    arr.sort((a, b) => a - b);
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
}

const getMode = (arr) => {
    const modeObj = {};
    let maxFrequency = 0;
    let modes = [];

    arr.forEach(num => {
        if (!modeObj[num]) modeObj[num] = 0;
        modeObj[num]++;
        if (modeObj[num] > maxFrequency) {
            maxFrequency = modeObj[num];
            modes = [num];
        } else if (modeObj[num] === maxFrequency) modes.push(num);
    });

    return modes;
}

const getFuelUse = (arr, target) => {
    let totalFuel = 0;
    arr.map(num => {
        let dist = Math.abs(num - target);
        let fuel = dist; //part 1
        //let fuel = dist * (dist + 1) / 2; // Part 2
        totalFuel += fuel;
    });

    return totalFuel;
}



const main = () => {
    const input = getInput();

    const mean = getMean(input);
    const median = getMedian(input);
    const mode = getMode(input);
    
    const meanFuel = getFuelUse(input, mean);
    const medianFuel = getFuelUse(input, median);
    const modeFuel = getFuelUse(input, mode);

    console.log(`Mean: ${mean} Fuel: ${meanFuel}`);
    console.log(`Median: ${median} Fuel: ${medianFuel}`);
    console.log(`Mode: ${mode} Fuel: ${modeFuel}`);
    
    const min = Math.min(meanFuel, medianFuel, modeFuel);

    console.log(`Min: ${min}`);
}

main();