let fs = require('fs');
let x = document.querySelector(".res");
let id = document.querySelector(".Input1");
let id2 = document.querySelector(".Input2");
let weight = document.querySelector(".Input3")
let idlist = new Set();
let m = new Map();

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


function update_map_values()
{
    try
    {

    let updatedObjects= Object.fromEntries(m);
        // Step 6: Write the updated objects back to the JSON file
        fs.writeFileSync("savedGraph.json", JSON.stringify(updatedObjects, null, 2), 'utf8');
        console.log('JSON file updated successfully!');
    } catch (err) {
        console.error('Error processing the file:', err);
    }
}

async function change_weight() {
    fill_set();
    let temp=[];
    let temp2=[];
    let weightvalue=weight.value.toString().trim();
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
            temp=j.flat();
            if (temp.includes(idvalue2)){
            temp2=temp.toSpliced((temp.indexOf(idvalue2)+1),1,weightvalue);
            pairs = temp2.reduce((acc, val, index) => {
        if (index % 2 === 0) {
            acc.push([val]);
        } else {
            acc[acc.length - 1].push(val);
        }
        return acc;
             }, []);
                m.set(i, pairs);
                connected = true;
            }
            else
            {
                x.innerHTML = "Submitted Users are not connected with eachother! Connect them and try again.";
            }
        }
        }
        for ([i, j] of m) {
            if (idvalue2 === i[0]) {
            temp=j.flat();
            if (temp.includes(idvalue)){
            temp2=temp.toSpliced((temp.indexOf(idvalue)+1),1,weightvalue);
            pairs = temp2.reduce((acc, val, index) => {
        if (index % 2 === 0) {
            acc.push([val]);
        } else {
            acc[acc.length - 1].push(val);
        }
        return acc;
             }, []);
                m.set(i, pairs);
                    connected = true;


                }
                else
                {
                    x.innerHTML = "Submitted Users are not connected with eachother! Connect them and try again.";
                }
            }
        }
        if (connected) {
            x.innerHTML = "User with ID " + idvalue + " and User with ID " + idvalue2 + " are now connected with a weight of " + weightvalue + " .";
            update_map_values();
        }
    }
    id.value = "";
    id2.value = "";
    weight.value="";
}
  