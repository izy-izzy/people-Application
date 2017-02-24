///<reference path="../../../main.d.ts" />
var people;
(function (people) {
    'use strict';
    var peopleModuleInject = ['$stateProvider'];
    peopleModuleConfig.$inject = peopleModuleInject;
    function peopleModuleConfig($stateProvider) {
        $stateProvider
            .state('people', {
            url: '/people',
            component: 'peopleListComponent'
        });
    }
    angular
        .module('people', [])
        .config(peopleModuleConfig);
})(people || (people = {}));
