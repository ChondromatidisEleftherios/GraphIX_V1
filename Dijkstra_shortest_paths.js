let fs = require('fs');
let x = document.querySelector(".res");
let id = document.querySelector(".Input1");
let id2 = document.querySelector(".Input2");
let idlist = new Set();
let graph = new Map();
let optimalPath = [];



function fill_set() {
    if (!fs.existsSync("saved_ids.txt")) {
        return;
    }

    try {
        let data = fs.readFileSync("saved_ids.txt", 'utf-8');
        data
            .split('\n')
            .map(line => line.trim())
            .filter(line => line !== "")
            .forEach(line => idlist.add(line));
        console.log("Lines added to idlist:", idlist);
    } catch (error) {
        console.error("Error reading the file:", error);
    }
}



function insert_users_to_map() {
    try {
        let data = fs.readFileSync('savedGraph.json', 'utf8');
        let obj = JSON.parse(data);
        let sub;
        for ([i, j] of Object.entries(obj)) {
            sub = i;
            sub = sub.substring(0, sub.indexOf(','));
            graph.set(sub, j);
        }
        for ([i,j] of graph){
            for (let jj of j) {
                jj[1]=parseFloat(jj[1]); //μετατροπη των βαρων απο string σε πραγματικό αριθμό
        }
    }
    } catch (err) {
        console.error("Error reading savedGraph.json:", err);
    }
}



function save_shortest_path(){

let dataToWrite = optimalPath.join('\n');

try {
    fs.writeFileSync('users_path.txt', dataToWrite);
} catch (err) {
    console.error('Σφάλμα κατά την εγγραφή του αρχείου:', err);
}
}


function findLowestCostNode(costs, processed) {
    let lowest = null;
    let lowestCost = 999999;

    for (let [node, cost] of costs) {
        if (cost < lowestCost && !processed.has(node)) {
            lowest = node;
            lowestCost = cost;
        }
    }
    return lowest;
}


async function apply_dijkstra(){
    let costs = new Map();
    let parents = new Map();
    let processed = new Set();
    let choice = id.value.toString().trim();
    let end_choice = id2.value.toString().trim();
    fill_set();
     if (!(idlist.has(choice))) {
        x.innerHTML = "ID " + choice + " does not exist!";
    } else if (!(idlist.has(end_choice))) {
        x.innerHTML = "ID " + end_choice + " does not exist!";
    } else {
    insert_users_to_map()
    for (let [node, edges] of graph) {
        if (node === choice) {
            for (let [neighbor, cost] of edges) {
                costs.set(neighbor, cost);
                parents.set(neighbor, choice);
            }
        } else {
            for (let [neighbor, cost] of edges) {
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
        let cost = costs.get(node);
        let children = graph.get(node) || [];

        for (let [n, nCost] of children) {
            let newCost = cost + nCost;
            if (!costs.has(n) || costs.get(n) > newCost) {
                costs.set(n, newCost);
                parents.set(n, node);
            }
        }
        processed.add(node);
        node = findLowestCostNode(costs, processed);
    }

    let parent = end_choice;
    while (parent) {
        optimalPath.unshift(parent); //βαζει στοιχειο στην αρχη, σαν ουρα//
        parent = parents.get(parent);
    }
    if (costs.get(end_choice)===999999){
        x.innerHTML = "No path found...";
    }
    else{
        x.innerHTML = "Finished!";
    optimalPath.push(costs.get(end_choice))
    save_shortest_path();
    console.log(optimalPath);
    }
}
}


