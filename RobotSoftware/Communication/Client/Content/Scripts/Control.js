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

        $scope.$service = $service;

        $scope.serverOnline = false;
        $scope.capturing = true;
        $scope.direction = '';

        $scope.init = function () {
            $service.checkAvailability($scope.serverAddress).then(function (available) {
                $scope.serverOnline = available;
            });
            $(window).on("keydown", $scope.keydown);
            $(window).keyup($scope.keyup);
        };

        var moving = false;

        $scope.moveForward = function () {
            $scope.direction = directions.up;
            //Mirror
            $service.moveForward($scope.serverAddress, 100);
        };

        $scope.moveBackward = function () {
            $scope.direction = directions.down;
            $service.moveBackward($scope.serverAddress, 100);
        };

        $scope.turnLeft = function () {
            $scope.direction = directions.left;
            $service.turnLeft($scope.serverAddress, 50, 3);
        };

        $scope.turnRight = function () {
            $scope.direction = directions.right;
            $service.turnRight($scope.serverAddress, 50, 3);
        };

        $scope.keydown = function (event) {
            if (!$scope.capturing) return;
            //UP
            if (event.keyCode == 38) {
                $scope.direction = directions.up;
                //Mirror
                if (!moving)
                    $service.moveForward($scope.serverAddress, 100);
                moving = true;
            }
            //DOWN
            if (event.keyCode == 40) {
                $scope.direction = directions.down;
                if (!moving)
                    $service.moveBackward($scope.serverAddress, 100);
                moving = true;
            }
            //LEFT
            if (event.keyCode == 37) {
                $scope.direction = directions.left;
                $service.turnLeft($scope.serverAddress, 50, 3);
            }
            //RIGHT
            if (event.keyCode == 39) {
                $scope.direction = directions.right;
                $service.turnRight($scope.serverAddress, 50, 3);
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
            if (event.keyCode == 38) {
                moving = false;
                $service.moveForward($scope.serverAddress, 0);
            }
            //DOWN
            if (event.keyCode == 40) {
                $service.moveBackward($scope.serverAddress, 0);
                moving = false;
            }
            //LEFT
            if (event.keyCode == 37) {
                $service.moveForward($scope.serverAddress, 0);
            }
            //RIGHT
            if (event.keyCode == 39) {
                $service.moveForward($scope.serverAddress, 0);
            }
            $scope.direction = '';
        };
    }]);