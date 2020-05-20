console.log('Hello TensorFlow');
const input_x = [
                [153.84,148.88],
                [147.92,154.55],
                [150.28,149.04],
                [442.08,451.13],
                [449.58,450.91],
];
const input_y = [0,0,0,1,1];

// X is the feature, in this case, the x_coordinate and y_coordinate of the points.
//I need to put the data into tensor,where all the data stays.
const X = tf.tensor(input_x);
console.log('x shape:', X.shape);
X.print();
// Y is the label we are tring to predict. In this casse, it's 0 and 1.
const Y = tf.tensor(input_y);

console.log(X);
console.log(Y);
console.log(tf.getBackend());
// m is the weight matrix
const m = tf.variable(tf.scalar(Math.random()));
// b is bias. Do i need to set the scale here? I suppose so. How?
const b = tf.variable(tf.scalar(Math.random()));
console.log(m);
console.log(b);
//part two: specify the training configuration(optimizer,loss, metrics)
// Fully connected layer

//Define a loss function

// define an optimizer
optimizer = tf.train.AdamOptimizer(learning_rate=0.0001).minimize(cost);

// create Model

const model = tf.sequential();
// adding input layer

model.add(tf.layers.dense({
    inputShape: [2],
    activation: "sigmoid",
    units: 10
}))
// adding output layers
model.add(tf.layers.dense({
    inputShape: [1],
    activation: "softmax",
    units: 10
}))
model1.summary();
// compiling Model,change my loss function here. yeah.
model.compile({
    loss: "categoricalCrossentropy",
    optimizer: tf.train.adam()
})

model2 = t1.sequential();
model2.add(tf.layers.dense({
  inputShape:[2],
  activation:"sigmoid",
  units:10
}))
model2.add(tf.layers.dense({
  inputShape:[1];
  activation:"softmax",
  units:10
}))
model2.summary();
//print out epoch and loss and weight matrix


// use the weight matrix to calculate the grid.
