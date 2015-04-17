(function (angular, fabric) {
  'use strict';

  var module = angular.module('whiteboardDemo');

  module.directive('whiteboard', ['$window', function ($window) {
    return {
      restrict: 'E',
      scope: {
        lineWidth: '=lineWidth',
        lineColor: '=lineColor',
        paintMode: '=paintMode',
        moveMode: '=moveMode'
      },
      templateUrl: '/views/whiteboard-template.html',
      link: function (scope, element, attrs) {
        scope.fabric = new fabric.Canvas('whiteboard', {
          selection: false,
          backgroundColor: '#FFFFFF',
          selectionColor: '#0000FF',
          selectionLineWidth: 2
        });
        scope.canvasElement = $(element).find('.upper-canvas');
        scope.$canvas = scope.canvasElement[0];
        scope.context = scope.$canvas.getContext('2d');

        // Fill Container with Canvas
        scope.fabric.setDimensions({width:element.prop('offsetWidth') - 2, height: element.prop('offsetHeight') - 2});

        // Touch Events 
        //scope.$canvas.addEventListener('touchstart', scope.brushDown, false);
        //scope.$canvas.addEventListener('touchmove', scope.brushMove, false);
        //scope.$canvas.addEventListener('touchend', scope.brushUp, false);

        // Mouse Events
        scope.canvasElement.on('mousedown', scope.brushDown)
        scope.canvasElement.on('mousemove', scope.brushMove)
        scope.canvasElement.on('mouseup', scope.brushUp)

        //Disable Page Move
        document.body.addEventListener('touchmove', function ($event) {
          $event.preventDefault();
        });

        // Fabric Test Code TODO: Remove
        scope.rect = new fabric.Rect({
          left: 500,
          top: 500,
          fill: '#FF0000',
          width: 200,
          height: 200
        });

        scope.fabric.add(scope.rect);
      },
      controller: ['$scope', function ($scope) {
        var WhiteBoardCtrl = {},
            isDown = false, canvasPosition;

        $scope.imageElements = [];

        $scope.moveMode = (angular.isDefined($scope.moveMode)) ? $scope.moveMode : false;
        $scope.paintMode = (angular.isDefined($scope.paintMode)) ? $scope.paintMode : true;

        WhiteBoardCtrl.getEventPosition = function ($event) {
          var position = [];

          if ($event.type === 'mousedown' || $event.type === 'mousemove') {
            position[0] = $event.pageX - $scope.canvasElement.offset().left;
            position[1] = $event.pageY - $scope.canvasElement.offset().top;
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

          console.log("Down");
        };

        $scope.brushMove = function ($event) {
          if (isDown && $scope.paintMode) {
            canvasPosition = WhiteBoardCtrl.getEventPosition($event);
            $scope.context.lineTo(canvasPosition[0], canvasPosition[1]);
            $scope.context.strokeStyle = $scope.lineColor || '#000000';
            $scope.context.lineWidth = $scope.lineWidth || 5;
            $scope.context.stroke();
            console.log("Move");
          }
        };

        $scope.brushUp = function () {
          isDown = false;
          $scope.context.closePath();
          console.log("Up")
        };

        $scope.clearBoard = function () {
          $scope.context.clearRect(0, 0, $scope.$canvas.width, $scope.$canvas.height);
        };

        $scope.addImageToCanvas = function (event, image) {
          //$scope.context.drawImage(image, 0, 0, image.width, image.height);
          var imageInstance = new fabric.Image(image, {
            left: 100,
            top: 100
          });
          $scope.fabric.add(imageInstance);
          $scope.imageElements.push(imageInstance);
        };

        $scope.$on('clearBoard', $scope.clearBoard);
        $scope.$on('addImage', $scope.addImageToCanvas);

        $scope.$watch(function () {
          return $scope.moveMode;
        }, function () {
          var imageIndex;

          $scope.rect.set('selectable', $scope.moveMode);

          for (imageIndex = $scope.imageElements.length - 1; imageIndex >= 0; imageIndex -= 1) {
            $scope.imageElements[imageIndex].set('selectable', $scope.moveMode);
          }
        });

      }]
    }
  }]);

}(angular, fabric));