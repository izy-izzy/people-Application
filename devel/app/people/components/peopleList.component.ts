///<reference path="../../../../main.d.ts" />

namespace people {

	'use strict';

	class peopleListController {

		static $inject: Array<string> = ['ngDialog','PeopleService'];

		public people:IPerson[]; // List of people to show
		public isLoading: boolean; // Is the component doing loading?
		public loadingPeopleFailed: boolean; // Does the loading of people failed?

		constructor(private ngDialog, private PeopleService:IPeopleService) {
			
			// Register at service to get updates.
			this.PeopleService.people.subscribe((people) => {
				this.people = people;
			});
			this.PeopleService.peopleLoadingError.subscribe((isErrorPresent) => {
				this.loadingPeopleFailed = isErrorPresent;
			});
			this.PeopleService.isLoading.subscribe((isLoading) => {
				this.isLoading = isLoading;
			});

			this.getPeopleList();
		}

		/**
		 * Ask service to load a people list from API.
		 * @memberOf peopleListController
		 */
		public getPeopleList():void{
			this.PeopleService.loadPeople();
		}

		/**
		 * Ask service to load a people list from fake data.
		 * @memberOf peopleListController
		 */
		public useFakePeople():void{
			this.PeopleService.loadFakePeople();
		}

		/**
		 * Ask service to remove the given person from a people list.
		 * @param {IPerson} person 
		 * @memberOf peopleListController
		 */
		public removePerson(person:IPerson):void{
			this.PeopleService.removePerson(person);
		}

		/**
		 * Initiate the editing of the selected user.
		 * @param {IPerson} person 
		 * @memberOf peopleListController
		 */
		public editPerson(person:IPerson):void{
			this.openAddEditDialog(true, person);
		}

		/**
		 * Initiate adding a new person.
		 * @memberOf peopleListController
		 */
		public addNewPerson():void{
			this.openAddEditDialog(false);
		}

		/**
		 * Open the dialog for editing or adding a new user.
		 * @private
		 * @param {boolean} edit If true the person is passed to dialog window
		 * @param {IPerson} [person] 
		 * 
		 * @memberOf peopleListController
		 */
		private openAddEditDialog(edit: boolean, person?: IPerson){
			var personForDialog:IPerson = person;
			var functionForDialogAfterconfirmation;

			if (edit && person){
				functionForDialogAfterconfirmation = (data) => {
					this.PeopleService.switchPerson(person, data.person);
				};
			} else {
				functionForDialogAfterconfirmation = (data) => {
					this.PeopleService.addPerson(data.person);
				};
			}

			this.ngDialog.open({
				template: '/templates/people/views/peopleAddNewModal.html',
				controller: 'peopleAddNewModalController',
				controllerAs: '$ctrl',
				resolve : {
					person : () => personForDialog,
					id: () => 'NewPersonModalDialog',
					edit: () => edit
				},
				preCloseCallback: (data:IAddNewPersonModalResponse) => {
					if ((data) && (data.save)){
						functionForDialogAfterconfirmation(data);
					}
					return true;
				}
			});
		}

	}

	/**
	 * Shows the list of all people.
	 * Allows adding a new person, editing and removing existing ones.
	 * 
	 * @class peopleListComponent
	 */
	class peopleListComponent {

		public bindings: any;
		public controller: any;
		public controllerAs: any;
		public templateUrl: string;

		constructor() {
			this.bindings = {};
			this.controller = peopleListController;
			this.controllerAs = '$ctrl';
			this.templateUrl = '/templates/people/views/peopleList.html';
		}
	}

	angular
		.module('people')
		.component('peopleListComponent', new peopleListComponent());
	
};
