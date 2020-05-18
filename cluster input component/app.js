var myApp = angular.module('cluster',[]);
myApp.controller('puller_clustertController', function($scope){
    $scope.x_coordinate = 148;
    $scope.y_coordinate = 45;
    $scope.radius = 7.5;
    $scope.number_of_points = 100;
    $scope.noise = 0;
  });

myApp.controller('Penalizer_clustertController', function($scope){
    $scope.x_coordinate = 148;
    $scope.y_coordinate = 45;
    $scope.radius = 7.5;
    $scope.number_of_points = 100;
    $scope.noise = 0;
  });

myApp.controller('Large_margin_clusterController', function($scope){
    $scope.x_coordinate = 148;
    $scope.y_coordinate = 45;
    $scope.radius = 7.5;
    $scope.number_of_points = 100;
    $scope.noise = 0;
  });
