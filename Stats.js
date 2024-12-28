let fs = require('fs');
let idlist = new Set();
let m = new Map();
let x = document.querySelector(".res1");
let y = document.querySelector(".res2");

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


function insert_users_to_map(){
    let arr=[];
    let data = fs.readFileSync('savedGraph.json'); // Read the file synchronously
    let obj = JSON.parse(data); // Parse the JSON data
    for ([i, j] of Object.entries(obj)) { //Μετατροπή από obj σε map
        arr = i.split(",");
        m.delete(i); // Remove the old key
        m.set(arr, j); // Set the new key as an arra
}
}

function find_total_users(){	
return m.size;
}

function find_total_connections(){
return 
}


async function caller(){
	let total_users;
	fill_set();
	insert_users_to_map();
	total_users = find_total_users();
	find_total_connections();


}