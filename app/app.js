/*globals angular*/

(function (angular) {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('whiteboardDemo', [
    'ui.router',
    'ngTouch'
  ]).
  config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('whiteboard', {
          url: '/',
          views: {
            '@': {
              templateUrl: '/views/whiteboard.html',
              controller: 'WhiteboardCtrl'
            }
          }
        });

        $urlRouterProvider.otherwise('/');

  }]);
}(angular));