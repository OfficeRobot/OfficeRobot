/**
 * Created by gmeszaros on 2013.10.05..
 */

var AppModule = angular.module('robot', ['robot.service']);

AppModule.controller('MainCtrl', ['$scope','controlService',
    function ($scope, $service) {
        //
        //Address of the PI with port
        $scope.serverAddress="http://10.14.139.201";

        $scope.serverOnline = false;
        $scope.capturing = false;

        $scope.init = function () {
            //$service.moveForward($scope.serverAddress, 100)
            //$service.moveBackward($scope.serverAddress, 100)
            //$service.turnLeft($scope.serverAddress, 90)
            //$service.turnRight($scope.serverAddress, 90)

            $service.checkAvailability($scope.serverAddress).then(function(available){
                $scope.serverOnline = available;
            });
            $(window).keydown($scope.keydown);
            $(window).keyup($scope.keyup);
        };

        $scope.keydown = function(event){
            //UP
            if(event.keyCode == 38)
                $service.moveForward($scope.serverAddress, 100);
            //DOWN
            if(event.keyCode == 40)
                $service.moveBackward($scope.serverAddress, 100);
            //LEFT
            if(event.keyCode == 37)
                $service.turnLeft($scope.serverAddress, 90);
            //RIGHT
            if(event.keyCode == 39)
                $service.turnRight($scope.serverAddress, 90);
        };

        $scope.keyup = function(event){
            //UP
            if(event.keyCode == 38)
                $service.moveForward($scope.serverAddress, 0);
            //DOWN
            if(event.keyCode == 40)
                $service.moveBackward($scope.serverAddress, 0);
            //LEFT
            if(event.keyCode == 37)
                $service.turnLeft($scope.serverAddress, 0);
            //RIGHT
            if(event.keyCode == 39)
                $service.turnRight($scope.serverAddress, 0);
        };
    }]);