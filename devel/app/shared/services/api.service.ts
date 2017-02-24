///<reference path="../../../../main.d.ts" />

declare interface IAPI {

	people:{
		query(): angular.resource.IResourceArray<IPerson>;
	}
}

(function(){

	'use strict';

	class Api implements IAPI {

		private apiDomain = 'http://www.mocky.io/v2/';

		public people;

		static $inject = ['$resource'];

		constructor(private $resource: angular.resource.IResourceService) {

			// Original request : fails on ALLOW ORIGIN and the response is also not valid JSON
			// this.people = $resource(this.apiDomain + '5807df4a10000004122b74e2', null, {}); // original with non valid JSON
			this.people = $resource(this.apiDomain + '58ac4bbc100000050f514b08', null, {});
			
		}
	}

	angular
		.module('shared')
		.service('API', Api);
})();
