let choice="A";
let end_choice="C"

function dijkstraAlgorithm(graph) {
    const costs = new Map();
    const parents = new Map();
    const processed = new Set();

    // Αρχικοποίηση του κόστους και των γονέων
    for (const [node, edges] of graph) {
        if (node === choice) {
            for (const [neighbor, cost] of edges) {
                costs.set(neighbor, cost);
                parents.set(neighbor, choice);
            }
        } else {
            for (const [neighbor, cost] of edges) {
                if (!costs.has(neighbor)) {
                    costs.set(neighbor, 999999);
                }
            }
        }
    }
    costs.set(choice, 0);
    costs.set(end_choice, 999999);
    parents.set(end_choice, null);

    let node = findLowestCostNode(costs, processed);

    while (node) {
        const cost = costs.get(node);
        const children = graph.get(node) || [];

        for (const [n, nCost] of children) {
            const newCost = cost + nCost;
            if (!costs.has(n) || costs.get(n) > newCost) {
                costs.set(n, newCost);
                parents.set(n, node);
            }
        }
        processed.add(node);
        node = findLowestCostNode(costs, processed);
    }

    const optimalPath = [];
    let parent = end_choice;
    while (parent) {
        optimalPath.unshift(parent); //βαζει στοιχειο στην αρχη, σαν ουρα//
        parent = parents.get(parent);
    }

    return { distance: costs.get(end_choice), path: optimalPath };
}

function findLowestCostNode(costs, processed) {
    let lowest = null;
    let lowestCost = 999999;

    for (const [node, cost] of costs) {
        if (cost < lowestCost && !processed.has(node)) {
            lowest = node;
            lowestCost = cost;
        }
    }
    return lowest;
}

const graph = new Map();
graph.set('A', [['B', 4],["C",8]]);
graph.set('B', [['A', 4], ['C', 7]]);
graph.set('C', [['D', 6], ["B", 7],["A",8]]);
graph.set('D', [["C",6]]);

console.log(dijkstraAlgorithm(graph));