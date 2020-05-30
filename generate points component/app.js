var myApp = angular.module('myApp', []);

myApp.controller('myCtrl', ['$scope', function($scope) {
    $scope.points = [];
    $scope.x_coordinate = 150;
    $scope.y_coordinate = 150;
    $scope.number_of_points = 100;
    $scope.radius = 10
    $scope.lable = 0
    $scope.cluster = 'puller';


    $scope.graph = {'width':300,'height':300};
    $scope.class_one_color = "blue";
    $scope.point_r =  1;

    $scope.myFunc = function() {
      $scope.points = [];
      var length = $scope.number_of_points;
      var max_radius = $scope.radius;
      var max_angle = 2 * Math.PI;

      const random_radius_Array =  Array(length).fill().map(() => Math.random() * max_radius);
      const random_angle_Array = Array(length).fill().map(() => Math.random() * max_angle);

      for(let i=0;i<length;i++){
        var x = (random_radius_Array[i] * Math.cos(random_angle_Array[i])+ $scope.x_coordinate).toFixed(2);
        var y = (random_radius_Array[i] * Math.sin(random_angle_Array[i])+ $scope.y_coordinate).toFixed(2);
        var myArray = new Array();
        myArray.push(parseFloat(x));
        myArray.push(parseFloat(y));
        $scope.points.push(myArray);

      }
    };


}]);
