const fs = require('fs');

const getInput = () => {
    const input = fs.readFileSync('input.txt', 'utf8');
    return input.split('\r\n').map(line => line.split('-'));
};


// graph: {
//     Node: {
//         routes: [],
//         largeCave: false
//     }, ...
// }
const createGraph = (input) => {
    const graph = {};
    input.forEach(line => {
        const [from, to] = line;
        if (!graph[from]) {
            graph[from] = {
                routes: [],
                largeCave: false
            };
        }
        graph[from].routes.push(to);
        if (!graph[to]) {
            graph[to] = {
                routes: [],
                largeCave: false
            };
        }
        graph[to].routes.push(from);

        
        graph[from].largeCave = /[A-Z]/.test(from);
        graph[to].largeCave = /[A-Z]/.test(to);
        
        
    });
    return graph;
};

//find all routes
//large caves can be visted multiple times
//small caves can only be visited once
//
// graph: {
//     Node: {
//         routes: [],
//         largeCave: false
//     }, ...
// }
//
const findAllPaths = (graph, start, end, path = []) => {
};



const main = () => {
    const input = getInput();
    const graph = createGraph(input);
    console.log(graph);


}

main();