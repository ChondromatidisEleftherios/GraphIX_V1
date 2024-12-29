let fs = require('fs');
let m = new Map();
let x = document.querySelector(".res");
let y = document.querySelector(".res2");


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
let con=[];
let r_con;
let set_for_edges = new Set();
   for ([i,j] of m){
    for (let jj of j) {
        if (jj[0]!=null){
        con=[i[0],jj[0]];
        con="["+con.toString()+"]";

        if (!set_for_edges.has(con.toString())) {
            r_con="[" + [jj[0],i[0]] + "]";
            set_for_edges.add(r_con); // Προσθήκη του ζεύγους στο σύνολο
        }
      }
    }
}
return set_for_edges.size;
}


async function caller(){
	insert_users_to_map();
    let total_users;
    let total_connections;
	total_users = find_total_users();
	total_connections = find_total_connections();
    x.innerHTML = "Total number of Users: " + total_users.toString();
    y.innerHTML = "Total number of Connections: " + total_connections.toString();
}