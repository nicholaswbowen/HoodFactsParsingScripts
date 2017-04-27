declare var require;
let fs = require('fs');
//input the file properties
let inputFile = ""; //file Path for tsv
let outputFile = ""; //file path for output, include .json extension
let referenceUrl = ""; // ex. https://en.wikipedia.org/wiki/List_of_U.S._states_by_poverty_rate
let type = ""; // MAKE SURE TO CAPITIALIZE AND SPACE THESE PROPERLY. These strings appear in the app.
let subtype = ""; // ex. type = "Beer" subtype = "Number of Craft Breweries"
// run the file with
// node parseTsv.js
let writeStream = fs.createWriteStream(outputFile, 'utf8');
let readFile = fs.readFileSync(inputFile, 'utf8');
let split = readFile.split(/\n/);
writeStream.write(`[`);
function addComma(length, index){
  console.log(`length = ${length}`)
  console.log(`index = ${index}`)
  if (index == length-1){
    return "";
  }else{
    return ",";
  }
}
let lines = split.forEach((line,index) => {
  line = line.replace(/[$%\r,]/g,'');
  // line = line.replace(/[\r]/g,'');
  let data = line.split(/\t/);
  // console.log(data);
  writeStream.write(`{"locationName":"${data[0]}",
"data":"${data[1]}",
"reference":"${referenceUrl}",
"type":"${type}",
"subtype": "${subtype}"}${addComma(split.length,index)}
`);
})
writeStream.write(`]`);
