/**
 * Created by LetStudy on 7/5/2016.
 */
var app= angular.module('myApp', []);
app.controller('Ctrl1', function($scope,$http){
    $http.get("http://www.w3schools.com/angular/customers.php")
        .then(function (response) {$scope.abc = response.data.records;});
})