var myApp = angular.module('myApp', []);
myApp.factory('d3Service',[function(){
  var d3;

  return d3;

}]);

angular.module('app',['d3']);

angular.module('myApp.directives', ['d3'])
  .directive('blogBarChart', ['d3Service',  function(d3Service) {
    return {
     restrict: 'EA',
     // directive code
    }
}]);
