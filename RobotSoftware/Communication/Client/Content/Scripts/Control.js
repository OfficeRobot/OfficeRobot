/**
 * Created by gmeszaros on 2013.10.05..
 */

var AppModule = angular.module('robot', ['robot.service']);

AppModule.controller('MainCtrl', ['$scope', 'controlService',
    function ($scope, $service) {
        var directions = { up: 'up', down: 'down', left: 'left', right: 'right' }
        //
        //Address of the PI with port
        $scope.serverAddress = "http://10.14.139.201";

        $scope.serverOnline = false;
        $scope.capturing = true;
        $scope.direction = '';

        $scope.init = function () {
            $service.checkAvailability($scope.serverAddress).then(function (available) {
                $scope.serverOnline = available;
            });
            $(window).keydown($scope.keydown);
            $(window).keyup($scope.keyup);
        };

        $scope.keydown = function (event) {
            if (!$scope.capturing) return;
            //UP
            if (event.keyCode == 38) {
                $scope.direction = directions.up;
                //Mirror
                $service.moveForward($scope.serverAddress, 100, 15);
                $service.moveBackward($scope.serverAddress, 100, 14);
            }
            //DOWN
            if (event.keyCode == 40) {
                $scope.direction = directions.down;
                $service.moveForward($scope.serverAddress, 100, 14);
                //Mirror
                $service.moveBackward($scope.serverAddress, 100, 15);
            }
            //LEFT
            if (event.keyCode == 37) {
                $scope.direction = directions.left;
                $service.moveBackward($scope.serverAddress, 100, 14);
                //Mirror
                $service.moveBackward($scope.serverAddress, 100, 15);
            }
            //RIGHT
            if (event.keyCode == 39) {
                $scope.direction = directions.right;
                $service.moveForward($scope.serverAddress, 100, 14);
                //Mirror
                $service.moveForward($scope.serverAddress, 100, 15);
            }
            //LEFT CAMERA 'Q'
            if (event.keyCode == 81) {
                $scope.direction = directions.left;
                $service.turnLeft($scope.serverAddress, 50, 3);
            }
            //RIGHT CAMERA 'W'
            if (event.keyCode == 87) {
                $scope.direction = directions.right;
                $service.turnRight($scope.serverAddress, 50, 3);
            }
        };

        $scope.keyup = function (event) {
            //UP
            if (event.keyCode == 38)
            {
                $service.moveForward($scope.serverAddress, 0, 15);
                $service.moveBackward($scope.serverAddress, 0, 14)
            }
            //DOWN
            if (event.keyCode == 40)
            {
                $service.moveForward($scope.serverAddress, 0, 15);
                $service.moveBackward($scope.serverAddress, 0, 14);
            }
            //LEFT
            if (event.keyCode == 37)
            {
                $service.moveForward($scope.serverAddress, 0, 15);
                $service.moveBackward($scope.serverAddress, 0, 14);
            }
            //RIGHT
            if (event.keyCode == 39)
            {
                $service.moveForward($scope.serverAddress, 0, 15);
                $service.moveBackward($scope.serverAddress, 0, 14);
            }
            $scope.direction = '';
        };
    }]);