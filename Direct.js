let fs = require('fs');
let x = document.querySelector(".res");
let id = document.querySelector(".Input1");
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
    // Έλεγχος αν το αρχείο υπάρχει
    if (!fs.existsSync("saved_ids.txt")) {
        //console.log("File does not exist. The Set remains unchanged.");
        return;
    }

    try {
        // Ανάγνωση περιεχομένων αρχείου
        let data = fs.readFileSync("saved_ids.txt", 'utf-8');

        // Διαχωρισμός των γραμμών και προσθήκη στο Set
        data
            .split('\n') // Διαχωρισμός των γραμμών
            .map(line => line.trim()) // Αφαίρεση κενών διαστημάτων από κάθε γραμμή
            .filter(line => line !== "") // Αφαίρεση κενών γραμμών
            .forEach(line => idlist.add(line)); // Προσθήκη κάθε γραμμής στο υπάρχον Set

        console.log("Lines added to idlist:", idlist);
    } catch (error) {
        //console.error("Error reading the file:", error);
    }
}


function insert_users_to_map()
{
    let arr=[];
    let data = fs.readFileSync('savedGraph.json'); // Read the file synchronously
    let obj = JSON.parse(data); // Parse the JSON data
    for ([i, j] of Object.entries(obj)) { //Μετατροπή από obj σε map
        arr = i.split(",");
        m.delete(i); // Remove the old key
        m.set(arr, j); // Set the new key as an arra
}
}


async function find_direct_connections() {
    fill_set();
    let count=0;
    let temp=[];
    let temp2=[];
    let idvalue = id.value.toString().trim();
    if (!(idlist.has(idvalue))) {
        x.innerHTML = "ID " + idvalue + " does not exist!";
    } 
     else {
        insert_users_to_map();
        for ([i, j] of m) {
            if (idvalue===i[0]){
                temp = j.flat();
                count = Math.floor(temp.length/2);
                console.log("Count value: ", count);
    }
}
        for (let i=0 ; i < temp.length ; i = i + 2){
            temp2.push(temp[i]);
        }
     if (!(count < 2)){
        x.innerHTML = "User with ID " + idvalue + " has " + count.toString() + " Direct Connections in total, with the following users: [" + temp2.toString() + "].";
     }
     else if (count === 1){
        x.innerHTML = "User with ID " + idvalue + " has only a direct connection with the user " + temp2.toString() + ".";
     }
     else if (count === 0){
        x.innerHTML = "User with ID " + idvalue + " has no direct connections...";
     }
}
id.value = "";
delete temp;
delete temp2;
delete count;
}