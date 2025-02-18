let fs = require('fs');
let x = document.querySelector(".res");
let id = document.querySelector(".Input1");
let id2 = document.querySelector(".Input2");
let idlist = new Set();
let m = new Map();
let new_window = null;

function read_all_users(){
     if (new_window && !new_window.closed) {
                new_window.close();
            }
try {
    let data = fs.readFileSync("savedGraph.json", 'utf8');

    new_window = window.open('', '_blank');

    if (new_window) {
        // Γέμισμα του νέου παραθύρου με HTML
        new_window.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>GraphIX - View all Users </title>
                <style>
                body,html{
                    background-color: #0c184c;
                    color: cyan;
                }
                </style>
            </head>
            <body>
                <p> All Users and their Connections:  </p>
                <pre>${data}</pre>
            </body>
            </html>
        `);
        new_window.document.close();
    }
} catch (err) {
}
}

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

        // Έλεγχος αν οι δύο χρήστες είναι ήδη συνδεδεμένοι
        let alreadyConnected = false;
        for ([i, j] of m) {
            if (idvalue === i[0]) {
                if (j.some(connection => connection[0] === idvalue2)) {
                    alreadyConnected = true;
                    break;
                }
            }
        }

        if (alreadyConnected) {
            x.innerHTML = "User with ID " + idvalue + " and User with ID " + idvalue2 + " are already connected!";
        } else {
            // Σύνδεση των δύο χρηστών
            for ([i, j] of m) {
                if (idvalue === i[0]) {
                    if ((j[0][0] === "null") || (j[0][0] == null)) {
                        m.set(i, [[idvalue2, "0.1"]]);
                    } else {
                        m.get(i).push([idvalue2, "0.1"]);
                    }
                    connected = true;
                }
            }
            for ([i, j] of m) {
                if (idvalue2 === i[0]) {
                    if ((j[0][0] === "null") || (j[0][0] == null)) {
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
    }
    id.value = "";
    id2.value = "";
}
