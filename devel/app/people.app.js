///<reference path="../../main.d.ts" />
(function () {
    'use strict';
    angular.module('peopleApp', [
        'ui.router',
        'ngResource',
        'ngAnimate',
        'ngDialog',
        'rx',
        'shared',
        'people'
    ]);
    var peopleAppInject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    peopleAppConfiguration.$inject = peopleAppInject;
    function peopleAppConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/people");
    }
    angular.module('peopleApp').config(peopleAppConfiguration);
})();
