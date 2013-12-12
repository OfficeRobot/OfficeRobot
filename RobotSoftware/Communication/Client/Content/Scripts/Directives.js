/**
 * Created by gmeszaros on 2013.12.12..
 */
angular.module('robot.directive', ['robot.service', 'ng'])
    .directive('speechChange', function () {
        return function (scope, elm, attrs) {
            elm.on('webkitspeechchange', scope[attrs.speechChange]);
        };
    });