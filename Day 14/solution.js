const fs  = require('fs');

//read file split by line
const getInput = () => {
    const input = fs.readFileSync('input.txt', 'utf8');
    let raw = input.split('\r\n');
    let index = raw.findIndex(line => line === '');
    let [start, reactions] = [raw.slice(0, index), raw.slice(index + 1, raw.length)];
    reactions = reactions.map(reaction => reaction.split(' -> '));

    return [start[0].split(''), reactions];
}

const react = (reactions, compound1, compound2) => {
    let newCompound = reactions.find(reaction => reaction[0] === compound1+compound2);
    let [comp1, comp2] = newCompound[0].split('');
    return [comp1, newCompound[1]];
}

const numberOfInstances = (array) => {
    let counts = {};
    array.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
    });
    
    return counts;
}

const mostCommon = (counts) => {
    let max = {count: 0, item: ''};
    for (let key in counts) {
        if (counts[key] > max.count) {
            max.count = counts[key];
            max.item = key;
        }
    }
    return max;
}

const leastCommon = (counts) => {
    let min = {count: Infinity, item: ''};
    for (let key in counts) {
        if (counts[key] < min.count) {
            min.count = counts[key];
            min.item = key;
        }
    }
    return min;
}


const main = (iterations) => {
    let [start, reactions] = getInput();
    for (let i = 0; i < iterations; i++){
        let newCompound = [];

        for (let i = 0; i < start.length-1; i++){
            newCompound.push(...react(reactions, start[i], start[i+1]));
        }

        newCompound.push(start[start.length-1]);

        //console.log(newCompound.join(''));
        start = newCompound;
    }

    console.log(numberOfInstances(start));
    let most = mostCommon(numberOfInstances(start));
    let least = leastCommon(numberOfInstances(start));

    console.log(most.count - least.count);
}

main(40);