import * as oboe from "oboe";
import * as simplify from 'simplify-geoJson';
let fs = require("fs");
// 22, -135
// 50,  -66
// -122.201323,47.992320
let writeStream = fs.createWriteStream('USCityBorders.geojson', 'utf8');
oboe(fs.createReadStream('USSimpleBorders.geojson', 'utf8'))
  .on('node','{id}', (data) => {
    let result:any = {};
    result.name = data.name;
    result.geometry = data.geometry;
    try{
      result.state = data.properties['is_in:state_code'];
    }catch(e){}
    let xMin = 180, xMax = -180, yMin = 180, yMax = -180
    data.geometry.coordinates.forEach((polygon) => {
      polygon[0].forEach((point)=> {
        if (point[1] > xMax){
          xMax = point[1];
        }
        if (point[1] < xMin){
          xMin = point[1];
        }
        if (point[0] > yMax){
          yMax = point[0];
        }
        if (point[0] < yMin){
          yMin = point[0];
        }
      })
    })
    result.bounds = {xMin, xMax, yMin, yMax};
    writeStream.write(`${JSON.stringify(result)}
`)
    console.log(`Loaded chunk with id ${data.id}` )
    return oboe.drop;
  })
  .on('done', () => {
    console.log("done");
  })
