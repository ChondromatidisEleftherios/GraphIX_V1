let fs= require("fs");

async function r_i_p()
{
	fs.writeFileSync("savedGraph.json", "", function(){console.log('done graph')});
	fs.writeFileSync("saved_ids.txt", "", function(){console.log('done ids')});
}