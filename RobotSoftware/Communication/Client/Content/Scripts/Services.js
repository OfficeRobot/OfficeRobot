/**
 * Created by gmeszaros on 2013.10.05..
 */
angular.module('robot.service', [], function ($provide) {

    $provide.service('controlService', ['$timeout', '$http', '$q', function ($timeout, $http, $q) {
        return {
            checkAvailability: function(serverAddress) {
                var deferred = $q.defer();
                $.ajax({
                    url: serverAddress,
                    dataType: 'jsonp',
                    data:{ check:true },
                    success: function (result) {
                        $timeout(function () { deferred.resolve(true); });
                    },
                    error:function(ex){
                        if(ex.status == 200)
                            $timeout(function () { deferred.resolve(true); });
                        else
                            $timeout(function () { deferred.reject(false); });
                    }
                });
                return deferred.promise;
            },
            moveForward: function (serverAddress, speed) {
                var deferred = $q.defer();
                $.ajax({
                    url: serverAddress,
                    dataType: 'jsonp',
                    data: { Action: 'move', Direction:'forward', Speed:speed },
                    success: function (result) {
                        $timeout(function () { deferred.resolve(true); });
                    },
                    error:function(ex){
                        if(ex.status == 200)
                            $timeout(function () { deferred.resolve(true); });
                        else
                            $timeout(function () { deferred.reject(false); });
                    }
                });
                return deferred.promise;
            },
            moveBackward: function (serverAddress, speed) {
                var deferred = $q.defer();
                $.ajax({
                    url: serverAddress,
                    dataType: 'jsonp',
                    data: { Action: 'move', Direction:'backward', Speed:speed },
                    success: function (result) {
                        $timeout(function () { deferred.resolve(true); });
                    },
                    error:function(ex){
                        if(ex.status == 200)
                            $timeout(function () { deferred.resolve(true); });
                        else
                            $timeout(function () { deferred.reject(false); });
                    }
                });
            },
            turnLeft: function (serverAddress, angle) {
                var deferred = $q.defer();
                $.ajax({
                    url: serverAddress,
                    dataType: 'jsonp',
                    data: { Action: 'turn', Direction:'left', Angle:angle },
                    success: function (result) {
                        $timeout(function () { deferred.resolve(true); });
                    },
                    error:function(ex){
                        if(ex.status == 200)
                            $timeout(function () { deferred.resolve(true); });
                        else
                            $timeout(function () { deferred.reject(false); });
                    }
                });
                return deferred.promise;
            },
            turnRight: function (serverAddress, angle) {
                var deferred = $q.defer();
                $.ajax({
                    url: serverAddress,
                    dataType: 'jsonp',
                    data: { Action: 'turn', Direction:'right', Angle:angle },
                    success: function (result) {
                        $timeout(function () { deferred.resolve(true); });
                    },
                    error:function(ex){
                        if(ex.status == 200)
                            $timeout(function () { deferred.resolve(true); });
                        else
                            $timeout(function () { deferred.reject(false); });
                    }
                });
                return deferred.promise;
            }
        };
    }]);
});