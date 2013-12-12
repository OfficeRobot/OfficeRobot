/**
 * Created by gmeszaros on 2013.10.05..
 */

var AppModule = angular.module('robot', ['robot.service', 'robot.directive']);

AppModule.controller('MainCtrl', ['$scope', 'controlService',
    function ($scope, $service) {
        var directions = { up: 'up', down: 'down', left: 'left', right: 'right' }
        //
        //Address of the PI with port
        $scope.serverAddress = "http://192.168.14.175";
        $scope.$watch("serverAddress", function (value) {
            if (value)
                $scope.tryConnect();
        });

        $scope.$service = $service;

        $scope.serverOnline = false;

        $scope.capturing = true;

        $scope.direction = '';

        $scope.init = function () {
            $(window).on("keydown", $scope.keydown);
            $(window).keyup($scope.keyup);
            $scope.initCommands();
        };

        $scope.tryConnect = function () {
            //$service.checkAvailability($scope.serverAddress).then(function (available) {
            //    $scope.serverOnline = available;
            //});
        };

        $scope.initCommands = function () {
            RobotSpeech.commands.push(Command('move', $scope.moveForward));
            RobotSpeech.commands.push(Command('back', $scope.moveBackward));
            RobotSpeech.commands.push(Command('stop', $scope.stop));
            RobotSpeech.commands.push(Command('left', $scope.turnLeft));
            RobotSpeech.commands.push(Command('right', $scope.turnRight));
        }

        $scope.handleSpeechInput = function (event) {
            var text = event.target.value;
            var command;
            for (var i = 0; i < RobotSpeech.commands.length; i++) {
                if (RobotSpeech.commands[i].name == text) {
                    command = RobotSpeech.commands[i];
                    break;
                }
            }
            if (command)
                command.action();
        };


        var moving = false;

        $scope.moveForward = function () {
            $scope.direction = directions.up;
            //Mirror
            if (!moving)
                $service.moveForward($scope.serverAddress, 100);
            moving = true;
        };

        $scope.moveBackward = function () {
            $scope.direction = directions.down;
            if (!moving)
                $service.moveBackward($scope.serverAddress, 100);
            moving = true;
        };

        $scope.stop = function () {
            moving = false;
            $service.moveForward($scope.serverAddress, 0);
            $scope.direction = '';
        };

        $scope.turnLeft = function () {
            $scope.direction = directions.left;
            if (!moving)
                $service.turnLeft($scope.serverAddress, 50, 3);
            moving = true;
        };

        $scope.turnRight = function () {
            $scope.direction = directions.right;
            if (!moving)
                $service.turnRight($scope.serverAddress, 50, 3);
            moving = true;
        };

        $scope.keydown = function (event) {
            if (!$scope.capturing) return;
            switch (event.keyCode) {
                //UP
                case 38:
                    $scope.moveForward();
                    break;
                //DOWN
                case 40:
                    $scope.moveBackward()
                    break;
                //LEFT
                case 37:
                    $scope.turnLeft();
                    break;
                //RIGHT
                case 39:
                    $scope.turnRight();
                    break;
                default:
            }
        };

        $scope.keyup = function (event) {
            $scope.stop();
        };
    }]);