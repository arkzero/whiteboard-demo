/*globals angular*/

(function (angular) {
  'use strict';

  var module = angular.module('whiteboardDemo');

  module.controller('WhiteboardCtrl', [
    '$scope',
    function ($scope) {
      $scope.lineWidth = 5;
      $scope.lineColor = '#000000';

      $scope.clearBoard = function () {
        $scope.$broadcast('clearBoard');
      };
    }
  ]);

}(angular));