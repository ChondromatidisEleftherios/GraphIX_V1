let a= new Map();
let met1=0;
let met2=0;
let met3=0;
let st=2;
for (let i=0 ; i < 10 ; i++)
{
    met1=Math.floor(Math.random()*15);
    met2=Math.floor(Math.random()*5);
    a.set(Math.random()*15,[[met2,0.3],[met1,0.6]]);
}
for ([,value] of a)
{
    console.log(value);
}
console.log("new");
/*for ([key,[value,value2]] of a)
{
    if ((value.includes(st))){
        value.splice(value.indexOf(st),2);
    }
     if ((value2.includes(st)))
    {
        value2.splice(value2.indexOf(st),2);
        value2=value2.toString();
        value2="";
    }
}
console.log("last loop");
for ([key,value] of a)
{
    console.log(key);
    console.log(value);
}*/
for (let [key, valueArrays] of a) {
    let flattened = valueArrays.flat(); // Flatten arrays
    console.log(flattened);
    if (flattened.includes(st))
    {
     flattened = flattened.splice(flattened.indexOf(st),2);   
    }
    console.log(flattened);
    //let index = 0;
    //a.set(key, valueArrays.map(arr => arr.map(() => flattened[index++])));
}
console.log("last loop");
for ([key,value] of a)
{
    console.log(key);
    console.log(value);
}
console.log("gg");