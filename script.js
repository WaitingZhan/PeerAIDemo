console.log('Hello TensorFlow');

function generateClusters(cx,cy,r,n_points,noise,cluster_name,p_lable){
  let cluster_points = [];
  var length = n_points;
  var max_radius = r;
  var max_angle = 2 * 3.134;



  for(let i=0;i<length;i++){
    var random_radius = Math.random() * max_radius;
    var random_angle = Math.random() * max_angle;
    var x = (random_radius * Math.cos(random_angle)+ cx).toFixed(2);
    var y = (random_radius * Math.sin(random_angle)+ cy).toFixed(2);
    var myArray = new Array();
    cluster_points.push({x_coordinate: x,  y_coordinate: y ,  cluster : cluster_name,   label : p_lable})
  }
  return cluster_points
}
var classZero =
  {puller: {cx: 148, cy: 45, radius : 7.5, npoint: 100 },
  penalizer: {cx: 148, cy: 158, radius : 15, npoint: 400 },
  large_margin: {cx: 7.5, cy: 128, radius : 7.5, npoint: 100 }}


var classOne = {puller: {cx: 208, cy: 211, radius : 7.5, npoint: 100 },
  penalizer: {cx: 208, cy: 98, radius : 15, npoint: 400 },
  large_margin: {cx: 348.5, cy: 128, radius : 7.5, npoint: 100 }}

//console.log(classZero.puller)
puller_cluster_zero =generateClusters(classZero.puller.cx,classOne.puller.cy,classZero.puller.radius,classZero.puller.npoint,0,"puller",0)
penalizer_cluster_zero =generateClusters(classZero.penalizer.cx,classOne.penalizer.cy,classZero.penalizer.radius,classZero.penalizer.npoint,0,"penalizer",0)
large_margin_cluster_zero =generateClusters(classZero.large_margin.cx,classOne.large_margin.cy,classZero.large_margin.radius,classZero.large_margin.npoint,0,"large_margin",0)

puller_cluster_One =generateClusters(classOne.puller.cx,classOne.puller.cy,classOne.puller.radius,classOne.puller.npoint,0,"puller",1)
penalizer_cluster_One =generateClusters(classOne.penalizer.cx,classOne.penalizer.cy,classOne.penalizer.radius,classOne.penalizer.npoint,0,"penalizer",1)
large_margin_cluster_One =generateClusters(classOne.large_margin.cx,classOne.large_margin.cy,classOne.large_margin.radius,classOne.large_margin.npoint,0,"puller",1)
const my_points = puller_cluster_zero.concat(penalizer_cluster_zero.concat(large_margin_cluster_zero).concat(puller_cluster_One).concat(large_margin_cluster_One.concat(penalizer_cluster_One)))

//console.log(my_points)
const width = 356;//356;
const height = 256;//256;


const input_x = [] //[x_coordinate,y_coordinate]
const input_y = [] // label
console.log("input y: ",input_y)
for (let p of my_points){
  input_x.push([ parseFloat(p.x_coordinate), parseFloat(p.y_coordinate)])
  input_y.push(p.label)
}
console.log("input x: ",input_x)
console.log("input y: ",input_y)


const X = tf.tensor(input_x);
console.log('x shape:', X.shape);
X.print();
// Y is the label we are tring to predict. In this casse, it's 0 and 1.
const Y = tf.tensor(input_y);
Y.print();
console.log('x tensor: ',X);
console.log('y tensor: ',Y);
console.log(tf.getBackend());


function generateTestData() {
  var testDataXY = []
  for (var y = 0; y < height; y += 3) {
      for (var x = 0; x < width; x += 3) {
          testDataXY.push([x, y])
      }
  }
  return tf.tensor(testDataXY)
}
const testData = generateTestData();
testData.print();




function createFeedForwardModel() {

    var model = tf.sequential()
    model.add(tf.layers.dense({
        units: 10,
        kernelInitializer: 'randomNormal',
        inputShape: 2,
        activation: 'relu',
        useBias: true
    }))
    // model.add(tf.layers.dense({
    //     units: 5,
    //     kernelInitializer: 'randomNormal',
    //     activation: 'relu',
    //     useBias: true
    // }))
    model.add(tf.layers.dense({
        units: 1,
        inputShape: 1,
        kernelInitializer: 'randomNormal',
        activation: 'sigmoid',
        useBias: true
    }))
    const optimizer = tf.train.adam(0.01);
    //
    model.compile({
        optimizer: optimizer,
        loss: "categoricalCrossentropy",
        metrics: ['accuracy'],
        //loss: custom_loss,
        //shuffle: true
    })
    return model
}
let newmodel = createFeedForwardModel();

newmodel.summary();
async function train() {
    var trainDataFeatures = [];
    var trainDataLabel = [];
    for (var i = 0; i < input_x.length; i++) {
        trainDataFeatures.push(input_x[i]);
        trainDataLabel.push(input_y[i]);
    }
    var xDataset = tf.data.array(trainDataFeatures);
    var yDataset = tf.data.array(trainDataLabel);
    const xyDataset = tf.data.zip({xs: xDataset, ys: yDataset}).batch(1024);

    console.log(xyDataset);
    for (let i = 1; i < 200; i += 50) {
        await newmodel.fitDataset(xyDataset,{
            epochs: 10,
            shuffle: true,

 });


        console.log(i);

        renderDecisionSurface(newmodel)
    }

    }



train();
var testDataTensor = generateTestData();

async function renderDecisionSurface(model) {

    label  =tf.split(model.predict(testDataTensor),1,1)[0].arraySync();

    console.log("predict:", label)

    var my_predict = []
    i = -1;
    console.log(label[0])
    for (var y = 0; y < height; y += 3) {
        for (var x = 0; x < width; x += 3) {
            cur_label = label[++i]
            //console.log(i,cur_label)
            my_predict.push({x_coordinate: x, y_coordinate: y, label: cur_label})
          }
        }
    console.log(my_predict.length)
    drawPredict(my_predict)
}
function drawPredict(test){
  var margin = {top: 20, right: 20, bottom: 40, left: 60},
      width = 500- margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

console.log(test)
  var svg = d3.select("#decision")
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
                           .filter(function(d){return 0 <= d.label && d.label < 0.5})
                           .attr("cx",function(d){return d.x_coordinate})
                           .attr("cy",function(d){return d.y_coordinate})
                           .attr("r",2)
                           .attr("fill","pink")
                   background.append("circle")
                                            .filter(function(d){return 0.5 < d.label && d.label <= 1})
                                            .attr("cx",function(d){return d.x_coordinate})
                                            .attr("cy",function(d){return d.y_coordinate})
                                            .attr("r",2)
                                            .attr("fill","lightblue")
                  background.append("circle")
                                  .filter(function(d){return 0.299 <= d.label && d.label <=0.3})
                                  .attr("cx",function(d){return d.x_coordinate})
                                  .attr("cy",function(d){return d.y_coordinate})
                                  .attr("r",2)
                                  .attr("fill","red")
                 background.append("circle")
                                  .filter(function(d){return 0.699 <= d.label && d.label <= 0.7})
                                  .attr("cx",function(d){return d.x_coordinate})
                                  .attr("cy",function(d){return d.y_coordinate})
                                  .attr("r",2)
                                  .attr("fill","blue")
  var classes =  svg.append("g")
                    .selectAll("*")
                   .data(my_points).enter();
  // draw label zero
  classes.append("circle")
       .filter(function(d){return d.label == 0})
       .attr("cx",function(d){return d.x_coordinate})
       .attr("cy",function(d){return d.y_coordinate})
       .attr("r",2)
       .attr("fill","red")
  // draw label one
  classes.append("circle")
     .filter(function(d){return d.label == 1})
     .attr("cx",function(d){return d.x_coordinate})
     .attr("cy",function(d){return d.y_coordinate})
     .attr("r",2)
     .attr("fill","blue")

     svg.append("g")
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
