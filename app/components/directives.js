(function (angular) {
  'use strict';

  var module = angular.module('whiteboardDemo');

  module.directive('whiteboard', ['$window', function ($window) {
    return {
      restrict: 'E',
      scope: {
        lineWidth: '=lineWidth',
        lineColor: '=lineColor'
      },
      templateUrl: '/views/whiteboard-template.html',
      link: function (scope, element, attrs) {
        scope.$canvas = element.find('canvas')[0];
        scope.context = scope.$canvas.getContext('2d');

        // Fill Container with Canvas
        scope.$canvas.width = element.prop('offsetWidth') - 2;
        scope.$canvas.height = element.prop('offsetHeight') - 2;

        // Set Background Color
        scope.context.fillStyle = '#FFFFFF';
        scope.context.fillRect(0, 0, scope.$canvas.width, scope.$canvas.height);

        scope.context.lineWidth = scope.lineWidth || 5;

        scope.$canvas.addEventListener('touchstart', scope.brushDown, false);
        scope.$canvas.addEventListener('touchmove', scope.brushMove, false);
        scope.$canvas.addEventListener('touchend', scope.brushUp, false);

        //Disable Page Move
        document.body.addEventListener('touchmove', function ($event) {
          $event.preventDefault();
        })
      },
      controller: ['$scope', function ($scope) {
        var WhiteBoardCtrl = {},
            isDown = false, canvasPosition;

        WhiteBoardCtrl.getEventPosition = function ($event) {
          var position = [];

          if ($event.type === 'mousedown' || $event.type === 'mousemove') {
            position[0] = $event.pageX - $scope.$canvas.offsetLeft;
            position[1] = $event.pageY - $scope.$canvas.offsetTop;
          } else if ($event.type === 'touchstart' || $event.type === 'touchmove') {
            position[0] = $event.touches[0].pageX;
            position[1] = $event.touches[0].pageY
          }
          return position;
        };

        $scope.brushDown = function ($event) {
          isDown = true;
          $scope.context.beginPath();
          canvasPosition = WhiteBoardCtrl.getEventPosition($event);
          $scope.context.moveTo(canvasPosition[0], canvasPosition[1]);
        };

        $scope.brushMove = function ($event) {
          if (isDown) {
            canvasPosition = WhiteBoardCtrl.getEventPosition($event);
            $scope.context.lineTo(canvasPosition[0], canvasPosition[1]);
            $scope.context.strokeStyle = $scope.lineColor || '#000000';
            $scope.context.lineWidth = $scope.lineWidth || 5;
            $scope.context.stroke();
          }
        };

        $scope.brushUp = function () {
          isDown = false;
          $scope.context.closePath();
        };

        $scope.clearBoard = function () {
          $scope.context.clearRect(0, 0, $scope.$canvas.width, $scope.$canvas.height);
        };

        $scope.$on('clearBoard', $scope.clearBoard);
      }]
    }
  }]);

}(angular));