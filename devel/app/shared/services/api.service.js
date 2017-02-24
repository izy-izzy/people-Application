///<reference path="../../../../main.d.ts" />
(function () {
    'use strict';
    var Api = (function () {
        function Api($resource) {
            this.$resource = $resource;
            this.apiDomain = 'http://www.mocky.io/v2/';
            // Original request : fails on ALLOW ORIGIN and the response is also not valid JSON
            // this.people = $resource(this.apiDomain + '5807df4a10000004122b74e2', null, {}); // original with non valid JSON
            this.people = $resource(this.apiDomain + '58ac4bbc100000050f514b08', null, {});
        }
        Api.$inject = ['$resource'];
        return Api;
    }());
    angular
        .module('shared')
        .service('API', Api);
})();
