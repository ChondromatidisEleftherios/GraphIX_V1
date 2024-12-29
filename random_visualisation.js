let fs = require('fs');
let x = document.querySelector(".network");
let m = new Map();
let nodes = [];
let edges = [];
let set_for_edges= new Set();



function insert_users_to_map()
{
    let arr=[];
    let data = fs.readFileSync('random_graph.json'); // Read the file synchronously
    let obj = JSON.parse(data); // Parse the JSON data
    for ([i, j] of Object.entries(obj)) { //Μετατροπή από obj σε map
        arr = i.split(",");
        m.delete(i); // Remove the old key
        m.set(arr, j); // Set the new key as an arra
}
}

function clearance(){
    fs.writeFileSync("random_graph.json", "", function(){console.log('done graph')});
    fs.writeFileSync("saved_random_ids.txt", "", function(){console.log('done ids')});
}

async function make_random_graph(){
insert_users_to_map();
let con=[];
let r_con;
let temp=[];
let temp2=[];
   for ([i,j] of m){
        nodes.push({ id: i[0], label: i[0], color: "#00ecfc" }); // Add nodes using names as IDs
    for (let jj of j) {
        if (jj[0]!=null){
        con=[i[0],jj[0]];
        con="["+con.toString()+"]";

        if (!set_for_edges.has(con.toString())) {
            edges.push({ from: i[0], to: jj[0], width: (parseFloat(jj[1])*10), color: { color: "#4a1abf" }});
            r_con="[" + [jj[0],i[0]] + "]";
            set_for_edges.add(r_con); // Προσθήκη του ζεύγους στο σύνολο
        }
      }
    }
}
    // Create a vis.js network
    let data = {
      nodes: new vis.DataSet(nodes),
      edges: new vis.DataSet(edges),
    };
    let options = {
  physics: {
    enabled: true,
    solver: "barnesHut",
    barnesHut:{
      gravitationalConstant: -2000,
      centralGravity: 0.25,
      springLength: 60,
      springConstant: 0.02,
      damping: 0.09,
      avoidOverlap: 0
    }}};
    let network = new vis.Network(x, data, options);
    clearance();
}