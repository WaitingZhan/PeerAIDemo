// <script src="https://d3js.org/d3.v4.min.js"></script>
// let body = d3.select("#visualization")
// use a canvas of 356 * 256;
var my_points = [
  { x_coordinate: 148,  y_coordinate: 55 ,  cluster : "puller",   label : 0},
  { x_coordinate: 150,  y_coordinate: 45,   cluster:  "puller",   label : 0},
  { x_coordinate: 166,  y_coordinate: 44,   cluster:  "puller",   label : 0},
  { x_coordinate: 280,  y_coordinate: 221,  cluster:  "puller",   label : 1},
  { x_coordinate: 348,  y_coordinate: 98,   cluster:  "puller",   label : 1},
  { x_coordinate: 300,  y_coordinate: 128,  cluster:  "puller",   label : 1}
];
var my_points2 = [
  { x_coordinate: 148,  y_coordinate: 55 ,  cluster : "puller",   label : 0},
  { x_coordinate: 330,  y_coordinate: 45,   cluster:  "puller",   label : 0},
  { x_coordinate: 166,  y_coordinate: 44,   cluster:  "puller",   label : 0},
  { x_coordinate: 280,  y_coordinate: 221,  cluster:  "puller",   label : 1},
  { x_coordinate: 348,  y_coordinate: 98,   cluster:  "puller",   label : 1},
  { x_coordinate: 300,  y_coordinate: 128,  cluster:  "puller",   label : 1}
];

const width = 356;//356;
const height = 256;//256;
var my_test = []
for (var y = 0; y < height; y += 3) {
    for (var x = 0; x < width; x += 3) {
       label = Math.random()
        my_test.push({x_coordinate: x, y_coordinate: y, label: label})
    }
}
console.log(my_test)
//
// var classZero = [
//   {puller: {x_coordinate: 148, y_coordinate: 45, radius : 7.5, npoint: 100 }}
//   {penalizer: {x_coordinate: 148, y_coordinate: 158, radius : 15, npoint: 400 }}
//   {large_margin: {x_coordinate: 7.5, y_coordinate: 128, radius : 7.5, npoint: 100 }}
// ]
//
// var classOne = [
//   {puller: {x_coordinate: 208, y_coordinate: 211, radius : 7.5, npoint: 100 }}
//   {penalizer: {x_coordinate: 208, y_coordinate: 98, radius : 15, npoint: 400 }}
//   {large_margin: {x_coordinate: 348.5, y_coordinate: 128, radius : 7.5, npoint: 100 }}
// ]

// create svg element
// set the dimensions and margins of the graph
// https://www.d3-graph-gallery.com/graph/custom_axis.html


// create svg element, respecting margins
drawAxis()
drawPoints(my_points)
drawPoints(my_points2)
drawTest(my_test)

function drawTest(test){
  var margin = {top: 20, right: 20, bottom: 40, left: 60},
      width = 356*1.5 - margin.left - margin.right,
      height = 256*1.5 - margin.top - margin.bottom;


  var svg = d3.select("#point")
               .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                //.attr("style","background-color:orange")
              .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");
  var background=  svg.selectAll("*")
                    .data(test).enter();
                      // draw label zero
                    background.append("circle")
                           .filter(function(d){return 0 <= d.label && d.label < 0.3})
                           .attr("cx",function(d){return d.x_coordinate})
                           .attr("cy",function(d){return d.y_coordinate})
                           .attr("r",1)
                           .attr("fill","pink")
                  background.append("circle")
                                  .filter(function(d){return 0.3 <= d.label && d.label < 0.5})
                                  .attr("cx",function(d){return d.x_coordinate})
                                  .attr("cy",function(d){return d.y_coordinate})
                                  .attr("r",1)
                                  .attr("fill","black")
                 background.append("circle")
                                  .filter(function(d){return 0.5 <= d.label && d.label < 0.7})
                                  .attr("cx",function(d){return d.x_coordinate})
                                  .attr("cy",function(d){return d.y_coordinate})
                                  .attr("r",1)
                                  .attr("fill","blue")
                 background.append("circle")
                                  .filter(function(d){return 0.7 <= d.label && d.label < 1})
                                  .attr("cx",function(d){return d.x_coordinate})
                                  .attr("cy",function(d){return d.y_coordinate})
                                  .attr("r",1)
                                  .attr("fill","orange")


}

function drawPoints(points){
  var margin = {top: 20, right: 20, bottom: 40, left: 60},
      width = 356*1.5 - margin.left - margin.right,
      height = 256*1.5 - margin.top - margin.bottom;


  var svg = d3.select("#point")
               .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("style","background-color:pink")
              .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");
console.log(points)
   var classes =  svg.selectAll("*")
                    .data(points).enter();
// draw label zero
  classes.append("circle")
        .filter(function(d){return d.label == 0})
        .attr("cx",function(d){return d.x_coordinate})
        .attr("cy",function(d){return d.y_coordinate})
        .attr("r",4)
        .attr("fill","blue")
// draw label one
classes.append("circle")
      .filter(function(d){return d.label == 1})
      .attr("cx",function(d){return d.x_coordinate})
      .attr("cy",function(d){return d.y_coordinate})
      .attr("r",4)
      .attr("fill","Yellow")

}
function drawAxis(){

  var margin = {top: 20, right: 20, bottom: 40, left: 60},
      width = 356*1.5 - margin.left - margin.right,
      height = 256*1.5 - margin.top - margin.bottom;
  var svg = d3.select("#res")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("style","background-color:pink")
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  // Add X axis
  var x = d3.scaleLinear().domain([0, 356]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 256]).range([ height, 0]);
  svg
    .append("g")
    .call(d3.axisLeft(y));

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 20)
      .text("X axis");

  // Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+20)
      .attr("x", -margin.top)
      .text("Y axis")
}


console.log("draw something here please.")
