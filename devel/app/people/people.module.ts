///<reference path="../../../main.d.ts" />

module people {
	
	'use strict';

	var peopleModuleInject : Array<string> = ['$stateProvider'];
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
}
