/*globals angular*/

(function (angular) {
  'use strict';

  var module = angular.module('whiteboardDemo');

  module.controller('WhiteboardCtrl', [
    '$scope',
    function ($scope) {
      $scope.lineWidth = 5;
      $scope.lineColor = '#000000';

      $scope.paintMode = true;
      $scope.moveMode = false;

      $scope.clearBoard = function () {
        $scope.$broadcast('clearBoard');
      };

      $scope.togglePaintMode = function () {
        $scope.paintMode = true;
        $scope.moveMode = false;
      };

      $scope.toggleMoveMode = function () {
        $scope.moveMode = true;
        $scope.paintMode = false;
      };

      $scope.addImage = function ($files) {
        var reader;
        if (/^image/.test($files[0].type)) {
          console.log($files[0]);
          reader = new FileReader();

          reader.onload = onLoadFile;
          reader.readAsDataURL($files[0]);
        }

        function onLoadFile (event) {
          var img = new Image();
          img.onload = onLoadImage;
          img.src = event.target.result;
        }

        function onLoadImage () {
          $scope.$broadcast('addImage', this);
        }
      };
    }
  ]);

}(angular));