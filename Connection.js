let fs = require('fs');
let x = document.querySelector(".res");
let id = document.querySelector(".Input1");
let id2 = document.querySelector(".Input2");
let idlist = new Set();
let m = new Map();

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
        for (let [i, j] of Object.entries(obj)) {
            let arr = i.split(",");
            m.delete(i);
            m.set(arr, j);
        }
    } catch (err) {
        console.error("Error reading savedGraph.json:", err);
    }
}

function update_map_values() {
    try {
        let updatedObjects = Object.fromEntries(m);
        fs.writeFileSync("savedGraph.json", JSON.stringify(updatedObjects, null, 2), 'utf8');
        console.log('JSON file updated successfully!');
    } catch (err) {
        console.error('Error processing the file:', err);
    }
}

async function connect_users() {
    fill_set();
    let idvalue = id.value.toString().trim();
    let idvalue2 = id2.value.toString().trim();
    if (!(idlist.has(idvalue))) {
        x.innerHTML = "ID " + idvalue + " does not exist!";
    } else if (!(idlist.has(idvalue2))) {
        x.innerHTML = "ID " + idvalue2 + " does not exist!";
    } else {
        insert_users_to_map();
        let connected = false;
        for ([i, j] of m) {
            if (idvalue === i[0]) {
                if ((j[0][0]=="null")||(j[0][0]==null)){
                    m.set(i, [[idvalue2, "0.1"]]);
                } else {
                    m.get(i).push([idvalue2, "0.1"]);
                }
                connected = true;
            }
        }
        for ([i, j] of m) {
            if (idvalue2 === i[0]) {
                 if ((j[0][0]=="null")||(j[0][0]==null)){
                    m.set(i, [[idvalue, "0.1"]]);
                } else {
                    m.get(i).push([idvalue, "0.1"]);
                }
                connected = true;
            }
        }
        if (connected) {
            x.innerHTML = "User with ID " + idvalue + " and User with ID " + idvalue2 + " are now connected!";
            update_map_values();
        }
    }
    id.value = "";
    id2.value = "";
}
