import * as oboe from "oboe";
import * as simplify from 'simplify-geoJson';
let fs = require("fs");
// 22, -135
// 50,  -66
// -122.201323,47.992320
let writeStream = fs.createWriteStream('USSimpleStateBorders.geojson', 'utf8');
oboe(fs.createReadStream('admin_level_4.geojson', 'utf8'))
  .on('node','{id}', (data) => {
    let result = simplify(data,0.01);
    writeStream.write(`${JSON.stringify(result)}
`)
    console.log(`Loaded chunk with id ${data.id}` )
    return oboe.drop;
  })
  .on('done', () => {
    console.log("done");
  })
