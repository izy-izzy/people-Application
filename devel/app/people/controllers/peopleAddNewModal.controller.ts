///<reference path="../../../../main.d.ts" />

namespace people {

	'use strict';

	/**
	 * Controller for a modal window. After closing the modal window sends the 
	 * data according whether to save this person on not.
	 * 
	 * @class peopleAddNewModalController
	 */
	class peopleAddNewModalController {

		static $inject: Array<string> = ['ngDialog', 'id', 'person', 'edit'];
		public personToEdit:IPerson; // Copy of object that has been send to this dialog.

		constructor(private ngDialog, private id, private person, private edit) {
			this.personToEdit = angular.copy(this.person);
		}

		/**
		 * Cancel this dialog.
		 * @memberOf peopleAddNewModalController
		 */
		public cancel() {
			var data:IAddNewPersonModalResponse = {
				save: false
			}
			this.ngDialog.close(this.id, data);
		}

		/**
		 * Close this dialog and add a new person to response from this dialog.
		 * @memberOf peopleAddNewModalController
		 */
		public addNewPerson(){
			var data:IAddNewPersonModalResponse = {
				save: true,
				person : this.personToEdit
			}
			this.ngDialog.close(this.id, data);
		}
	}

	angular
		.module('people')
		.controller('peopleAddNewModalController', peopleAddNewModalController);
};