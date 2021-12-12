var fs = require('fs');

const getInput = () => {
    const file = fs.readFileSync('input.txt', 'utf8');
    const raw = file.split('\r\n');
    const strValues = raw.map(x => x.split(' -> '));
    const input = strValues.map(positions => {
        const [pos1, pos2] = positions;
        const [x1, y1] = pos1.split(',');
        const [x2, y2] = pos2.split(',');
        return {
            x1: parseInt(x1),
            y1: parseInt(y1),
            x2: parseInt(x2),
            y2: parseInt(y2)
        }
    });
    return input;
}

const removeDiagonals = (input) => {

    let output = []
    let diagonals = [];
    input.map(line => {
        line.x1 == line.x2 || line.y1 == line.y2 ? output.push(line) : diagonals.push(line);
    });

    return [output, diagonals];
}

const checkIfDiagonal = (line) => {
    return line.x1 == line.x2 || line.y1 == line.y2;
}


const genGrid = (size) => {
    const grid = [];
    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
            grid[i][j] = 0;
        }
    }
    return grid;
}

const fillGrid = (line, grid) => {
    let minX = Math.min(line.x1, line.x2);
    let maxX = Math.max(line.x1, line.x2);
    let minY = Math.min(line.y1, line.y2);
    let maxY = Math.max(line.y1, line.y2);
    
    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            grid[y][x]++;

        }
    }

    return grid;
}


const fillGridDiagonals = (line, grid) => {
    const { x1, y1, x2, y2 } = line;
    let minX = Math.min(x1, x2);
    let minY = Math.min(y1, y2);
    if (minX == x1) {
        if (minY == y1) {
            for (let [y,x] = [minY,minX]; y <= y2; y++, x++) {
                grid[y][x]++;
            }
        }else {
            for (let [y,x] = [y1,minX]; y >= minY; y--, x++) {
                grid[y][x]++;
            }
        }
    }else {
        if (minY == y2) {
            for (let [y,x] = [minY,minX]; y <= y1; x++, y++) {
                grid[y][x]++;
            }
        }else {
            for (let [y,x] = [y2,minX]; y >= minY; x++, y--) {
                grid[y][x]++;
            }
        }
    }

    return grid;
}




const searchGrid = (grid, value) => {
    let locations = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[x][y] >= value) {
                locations++;
            }
        }
    }

    return locations;
}
                

const main = () => {
    let [input, diagonals] = removeDiagonals(getInput());
    let grid = genGrid(1024);

    input.forEach(line => {
        grid = fillGrid(line, grid);
    });

    diagonals.forEach(line => {
        grid = fillGridDiagonals(line, grid);
    });

    
    let output = searchGrid(grid, 2);
    //console.log(input);
    //console.log(diagonals);
    console.log(output);
    //console.log(grid.join('\n'));
}

main();