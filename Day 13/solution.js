const fs = require('fs');

const getInput = () => {
    const input = fs.readFileSync('input.txt', 'utf8');
    let raw = input.split('\r\n').map(line => line.split(','));

    let index = raw.findIndex(line => line[0].includes('='));

    let points = raw.slice(0, index-1);
    let rawFolds = raw.slice(index , raw.length);
    
    let folds = rawFolds.map(rawFold => rawFold[0].split(' ')[2].split('='))
    folds = folds.map(x => [x[0], Number(x[1])])

    points = points.map(vals => vals.map(val => Number(val)))

    return [points, folds];
}

const foldPoints = (axis, value, point) => {
    if (axis === 'y') {
        if (point[1] > value) point[1] = (value*2) - point[1]
    } else {
        if (point[0] > value) point[0] = (value*2) - point[0]
    }

    return point;
}

const removeDoubles = (points) => {
    let newPoints = []
    for (let i = 0; i < points.length; i++){
        let match = false;
        for (let j = 0; j < newPoints.length; j++){
            if (newPoints[j][0] === points[i][0] && newPoints[j][1] === points[i][1]) {match = true; break}
        }
        match ? match : newPoints.push(points[i]) 
    }

    return newPoints;
}

//6x40 display
//. = off
//# = on
const display = (points) => {
    let display = [];
    for (let i = 0; i < 6; i++){
        display.push([]);
        for (let j = 0; j < 40; j++){
            display[i].push(' ');
        }
    }

    for (let i = 0; i < points.length; i++){
        display[points[i][1]][points[i][0]] = '#';
    }

    for (let i = 0; i < display.length; i++){
        console.log(display[i].join(''))
    }
}


const main = () => {
    let [points, folds] = getInput();
    folds.forEach(fold => {
        points.map(point => foldPoints(fold[0], fold[1], point))
        points = removeDoubles(points)
        console.log(points.length) //part 1
    })


    display(points)


}

main(); 