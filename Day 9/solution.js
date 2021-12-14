const fs = require('fs');

const getInput = () => {
    const file = fs.readFileSync('input.txt', 'utf8');
    const grid = file.split('\r\n').map(row => row.split('').map(Number))
    
    return grid;
}

const addGridBorder = (grid, borderValue) => {
    const newGrid = [[]];

    for (let i = 0; i < grid.length + 2; i++) {
        newGrid[0].push(borderValue);
    }

    for (let i = 0; i < grid.length; i++) {
        newGrid[i + 1] = [borderValue].concat(grid[i]).concat([borderValue]);
    }

    newGrid.push([]);

    for (let i = 0; i < grid.length + 2; i++) {
        newGrid[newGrid.length-1].push(borderValue);
    }


    return newGrid;
}

const trimGrid = (grid) => {
    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[i].length - 1; j++) {
            if (grid[i][j] < 9) {
                grid[i][j] = 0;
            }
        }
    }

    return grid;
}

const isLocalMinimum = (grid, x, y) => {
    let isMin = true;

    if (grid[y][x] >= grid[y][x - 1]) isMin = false;
    if (grid[y][x] >= grid[y][x + 1]) isMin = false;
    if (grid[y][x] >= grid[y - 1][x]) isMin = false;
    if (grid[y][x] >= grid[y + 1][x]) isMin = false;

    //console.log(`x: ${x}, y: ${y}, value: ${grid[y][x]}, isMin: ${isMin}`);
    return isMin;
}

const findLocalMinimums = (grid) => {
    const localMinimums = [];
    for (let y = 1; y < grid.length-1; y++) {
        for (let x = 1; x < grid[y].length-1; x++) {
            if (isLocalMinimum(grid, x, y)) {
                localMinimums.push({x, y, value: grid[y][x]});
            }
        }
    }
    return localMinimums;
}

const measureBasin = (grid, x, y) => {
    let area = 0;
    let queue = [[x, y]];

    while (queue.length > 0) {
        const [x, y] = queue.shift();
        if (grid[y][x] === 0) {
            area++;
            grid[y][x] = 1;
            if (grid[y][x - 1] === 0) queue.push([x - 1, y]);
            if (grid[y][x + 1] === 0) queue.push([x + 1, y]);
            if (grid[y - 1][x] === 0) queue.push([x, y - 1]);
            if (grid[y + 1][x] === 0) queue.push([x, y + 1]);
        }
    }

    return area;
}


const main = () => {
    //Part 1
    let grid = getInput();
    grid = addGridBorder(grid, 9);

    const localMinimums = findLocalMinimums(grid);
    
    let risk = 0;
    localMinimums.map(({x, y, value}) => {
        risk += 1 + value;
    });

    console.log(`Risk: ${risk}`);

    //Part 2
    grid = trimGrid(grid);
    let basins = [];
    localMinimums.map(({x, y, value}) => {
        const area = measureBasin(grid, x, y);
        console.log(`x: ${x}, y: ${y}, value: ${value}, area: ${area}`);
        basins.push(area);
    });

    basins.sort((a, b) => a - b);

    //three largest basins
    console.log(basins)

    console.log(`Largest: ${basins[basins.length - 1]}`);
    console.log(`Second largest: ${basins[basins.length - 2]}`);
    console.log(`Third largest: ${basins[basins.length - 3]}`);

    //total of three largest basins
    console.log(`Total: ${basins[basins.length - 1] * basins[basins.length - 2] * basins[basins.length - 3]}`);
}

main();