let fs = require('fs');
let x = document.querySelector(".res");
let name = document.querySelector(".Input1");
let interests= document.querySelector(".Input2");
let m = new Map();
let idlist = new Set();


function update_id_list(){
    let content = Array.from(idlist);
    content=content.toString();
    fs.appendFile("saved_ids.txt", content + "\n", (err) => {
    if (err) {
        //console.error("Failed to append to file:", err);
    } else {
        console.log("Content appended to saved_ids.txt");
    }
});
}

function save_users() {
    let obj = Object.fromEntries(m); // Μετατροπή του Map σε Object
    let existingData = {};

    // Αν υπάρχει το αρχείο, διάβασε τα περιεχόμενά του
    if (fs.existsSync('savedGraph.json')) {
        let data = fs.readFileSync('savedGraph.json', 'utf-8');
        try {
            existingData = JSON.parse(data); // Μετατροπή των δεδομένων από το αρχείο σε Object
        } catch (error) {
            //console.error("Failed to parse existing JSON data:", error);
        }
    }

    // Χρησιμοποιούμε το Object.assign για να συνδυάσουμε τα υπάρχοντα δεδομένα με τα νέα
    existingData = Object.assign(existingData, obj);

    // Αποθήκευση του συνδυασμένου αντικειμένου πίσω στο αρχείο
    fs.writeFileSync('savedGraph.json', JSON.stringify(existingData, null, 2));
}

function fill_set() {
    // Έλεγχος αν το αρχείο υπάρχει
    if (!fs.existsSync("saved_ids.txt")) {
        //console.log("File does not exist. The Set remains unchanged.");
        return;
    }

    try {
        // Ανάγνωση περιεχομένων αρχείου
        const data = fs.readFileSync("saved_ids.txt", 'utf-8');

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
async function insert_person_ns() {
    let inter=[];
    let num;
    let num2;
    let cindex1;
    let cindex2;
    let characters=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    if(interests.value.trim().length!=0)
    {
        inter=interests.value.split(";");
    }
    fill_set();
    if ((idlist.size) < 9999){
    do {
        num = Math.floor(Math.random() * (10000-2)+2);
        num2 = Math.floor(Math.random() * (10000-2)+2);
        cindex1 = Math.floor(Math.random() * characters.length);
        cindex2 = Math.floor(Math.random() * characters.length);
        num = (Math.abs(num2-num)).toString();
        num = (num+characters[cindex1]+characters[cindex2]).toString();
    } while (idlist.has(num)); // Εξασφαλίζουμε ότι δεν υπάρχει ήδη το ID.
    idlist.clear();
    idlist.add(num);
    update_id_list();
    idlist.clear();
}
else{
    x.innerHTML="Max User Limit of 10000 users reached, please CLEAR YOUR DATA and try again..." 
    return;
}

    if ((name.value.trim().length === 0)&&(interests.value.trim().length === 0)) { // Έλεγχος για κενό
        m.set([num,"null","null"], [[]]);
        x.innerHTML="User with ID of " + num + " inserted!" 
    } else if ((name.value.trim().length !== 0)&&(interests.value.trim().length === 0)) {
        m.set([num, name.value, "null"], [[]]);
            x.innerHTML= name.value + " with ID of " + num + " inserted!" 
    } else if ((name.value.trim().length === 0)&&(interests.value.trim().length !== 0)) {
        m.set([num, "null", inter], [[]]);
        x.innerHTML= "User with ID of " + num + " and interests: [" + inter + "] inserted!" 
    }
    else{
        m.set([num,name.value,inter], [[]]);
        x.innerHTML= name.value + " with ID of " + num + " and interests: [" + inter + "] inserted!" 
    }

    /*for (let [[i], j] of m) {
        console.log("mpike");
        console.log(i);
        console.log(j);
    }*/
    for ([key,value] of m)
    {
        console.log(key);
        console.log(value);
    }
    name.value = "";
    interests.value = "";
    save_users();
}

