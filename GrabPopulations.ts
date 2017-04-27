declare var require;
import * as cities from "all-the-cities";
let fs = require('fs');
let US = cities.filter((city) => {
  return city.country.match('US');
})
let writeStream = fs.createWriteStream('CityPopulations.json', 'utf8');
writeStream.write(`[`)
US.forEach((city) => {
  console.log(`loaded${city.name}`);
  writeStream.write(`{"locationName":"${city.name}",
"state": "${city.adminCode}",
"reference": "https://www.npmjs.com/package/all-the-cities",
"data": "${city.population}",
"type": "Demographic",
"subtype": "Estimated Population"},
`)
});
writeStream.write(`]`)
