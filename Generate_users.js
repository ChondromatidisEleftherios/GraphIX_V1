let fs = require('fs');
let x = document.querySelector(".res");
let m = new Map();
let u_num = document.querySelector(".Input1");
let idlist= new Set();

function update_id_list() {
    let content = Array.from(idlist);
    content = content.join("\n"); // Μετατροπή σε string με αλλαγή γραμμής ανάμεσα στα στοιχεία
    fs.appendFile("saved_random_ids.txt", content + "\n", (err) => {
        if (err) {
            //console.error("Failed to append to file:", err);
        } else {
            console.log("Content appended to saved_ids.txt");
        }
    });
}

function fill_set() {
    // Έλεγχος αν το αρχείο υπάρχει
    if (!fs.existsSync("saved_random_ids.txt")) {
        //console.log("File does not exist. The Set remains unchanged.");
        return;
    }

    try {
        // Ανάγνωση περιεχομένων αρχείου
        const data = fs.readFileSync("saved_random_ids.txt", 'utf-8');

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

function save_users() {
    let obj = Object.fromEntries(m); // Μετατροπή του Map σε Object
    let existingData = {};

    // Αν υπάρχει το αρχείο, διάβασε τα περιεχόμενά του
    if (fs.existsSync('random_graph.json')) {
        let data = fs.readFileSync('random_graph.json', 'utf-8');
        try {
            existingData = JSON.parse(data); // Μετατροπή των δεδομένων από το αρχείο σε Object
        } catch (error) {
            //console.error("Failed to parse existing JSON data:", error);
        }
    }
        // Χρησιμοποιούμε το Object.assign για να συνδυάσουμε τα υπάρχοντα δεδομένα με τα νέα
    existingData = Object.assign(existingData, obj);

    // Αποθήκευση του συνδυασμένου αντικειμένου πίσω στο αρχείο
    fs.writeFileSync('random_graph.json', JSON.stringify(existingData, null, 2));
} //Να το αλλαξω ωστε να κανει overwrite

function update_id_list_off() {
    let content = Array.from(idlist);
    content = content.join("\n"); // Μετατροπή σε string με αλλαγή γραμμής ανάμεσα στα στοιχεία
    fs.appendFile("saved_ids.txt", content + "\n", (err) => {
        if (err) {
            //console.error("Failed to append to file:", err);
        } else {
            console.log("Content appended to saved_ids.txt");
        }
    });
}

function save_users_off() {
    let obj = Object.fromEntries(m); // Μετατροπή του Map σε Object

    // Αποθήκευση του συνδυασμένου αντικειμένου πίσω στο αρχείο
    fs.writeFileSync('savedGraph.json', JSON.stringify(obj, null, 2));
} //Να το αλλαξω ωστε να κανει overwrite

function insert_users_to_map()
{
    let arr=[];
    let data = fs.readFileSync('random_graph.json'); // Read the file synchronously
    let obj = JSON.parse(data); // Parse the JSON data
    for (let [i, j] of Object.entries(obj)) { //Μετατροπή από obj σε map
        arr = i.split(",");
        m.delete(i); // Remove the old key
        m.set(arr, j); // Set the new key as an arra
}
for ([key,value] of m)
{
	console.log(key,value);
}
}

function clearance(){
	fs.writeFileSync("savedGraph.json", "", function(){console.log('done graph')});
	fs.writeFileSync("saved_ids.txt", "", function(){console.log('done ids')});
}

function connect_random_users() {
    let idlista = Array.from(idlist); // Λίστα των χρηστών
    let us_numm = parseInt(u_num.value); // Ο αριθμός των χρηστών που θα συνδεθούν
    let n1, n2, weight;
    let x = 0;
    while (x < Math.floor(us_numm / (3 / 2))) {
        let n1 = idlista[Math.floor(Math.random() * idlista.length)];
        let n2 = idlista[Math.floor(Math.random() * idlista.length)];
        weight = Math.random() * 1; // Τυχαίο βάρος μεταξύ 0 και 1
        weight = Math.round(weight * 100) / 100; // Στρογγυλοποίηση στα 2 δεκαδικά
        weight = weight.toString();
        n1=n1.toString();
        n2=n2.toString();
        // Έλεγχος αν οι δύο χρήστες είναι ήδη συνδεδεμένοι
        let alreadyConnected = false;
        if (n1!=n2){
        for ([i, j] of m) {
            if (n1 === i[0]) {
                if (j.some(connection => connection[0] === n2)) {
                    alreadyConnected = true;
                    break;
                }
            }
        }

        if (!(alreadyConnected)) {
        	x=x+1;
            // Σύνδεση των δύο χρηστών
            for ([i, j] of m) {
                if (n1 === i[0]) {
                    if ((j[0][0] === "null") || (j[0][0] == null)) {
                        m.set(i, [[n2, weight]]);
                    } else {
                        m.get(i).push([n2, weight]);
                    }
                    console.log("a");
                }
            }
            for ([i, j] of m) {
                if (n2 === i[0]) {
                    if ((j[0][0] === "null") || (j[0][0] == null)) {
                        m.set(i, [[n1, weight]]);
                    } else {
                        m.get(i).push([n1, weight]);
                    }
                    console.log("b");
                }
            }
}
}
}
}


function make_ids(){
	let num;
	let num2;
	let cindex1;
	let cindex2;
	let characters=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	let us_numm=parseInt(u_num.value);
	while (us_numm > 0){
		num = Math.floor(Math.random() * (10000-2)+2);
		num2 = Math.floor(Math.random() * (10000-2)+2);
		cindex1 = Math.floor(Math.random() * characters.length);
		cindex2 = Math.floor(Math.random() * characters.length);
		num = (Math.abs(num2-num)).toString();
		num = (num+characters[cindex1]+characters[cindex2]).toString();
		if (!(idlist.has(num))){
			idlist.add(num);
			m.set([num,"null","null"],[[]]);
			us_numm = us_numm - 1;
		}
	}
}



async function rewrite(){
clearance();
fill_set();
insert_users_to_map();
save_users_off();
update_id_list_off();

}

async function make_random_generated_users(){
	let us_num=parseInt(u_num.value);
	console.log("user num is ", us_num);

	if ((us_num < 2)||((us_num > 9999))){
		x.innerHTML = "The accepted range is (2,9999) users.";
	}
	else{
	make_ids();
	connect_random_users();
	for ([key,value] of m)
	{
		console.log(key,value)
	}
	update_id_list();
	save_users();
	idlist.clear();
	m.clear();
}
u_num.value="";
}