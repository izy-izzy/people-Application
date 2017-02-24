///<reference path="../../../../main.d.ts" />
var people;
(function (people_1) {
    'use strict';
    var peopleListController = (function () {
        function peopleListController(ngDialog, PeopleService) {
            var _this = this;
            this.ngDialog = ngDialog;
            this.PeopleService = PeopleService;
            // Register at service to get updates.
            this.PeopleService.people.subscribe(function (people) {
                _this.people = people;
            });
            this.PeopleService.peopleLoadingError.subscribe(function (isErrorPresent) {
                _this.loadingPeopleFailed = isErrorPresent;
            });
            this.PeopleService.isLoading.subscribe(function (isLoading) {
                _this.isLoading = isLoading;
            });
            this.getPeopleList();
        }
        /**
         * Ask service to load a people list from API.
         * @memberOf peopleListController
         */
        peopleListController.prototype.getPeopleList = function () {
            this.PeopleService.loadPeople();
        };
        /**
         * Ask service to load a people list from fake data.
         * @memberOf peopleListController
         */
        peopleListController.prototype.useFakePeople = function () {
            this.PeopleService.loadFakePeople();
        };
        /**
         * Ask service to remove the given person from a people list.
         * @param {IPerson} person
         * @memberOf peopleListController
         */
        peopleListController.prototype.removePerson = function (person) {
            this.PeopleService.removePerson(person);
        };
        /**
         * Initiate the editing of the selected user.
         * @param {IPerson} person
         * @memberOf peopleListController
         */
        peopleListController.prototype.editPerson = function (person) {
            this.openAddEditDialog(true, person);
        };
        /**
         * Initiate adding a new person.
         * @memberOf peopleListController
         */
        peopleListController.prototype.addNewPerson = function () {
            this.openAddEditDialog(false);
        };
        /**
         * Open the dialog for editing or adding a new user.
         * @private
         * @param {boolean} edit If true the person is passed to dialog window
         * @param {IPerson} [person]
         *
         * @memberOf peopleListController
         */
        peopleListController.prototype.openAddEditDialog = function (edit, person) {
            var _this = this;
            var personForDialog = person;
            var functionForDialogAfterconfirmation;
            if (edit && person) {
                functionForDialogAfterconfirmation = function (data) {
                    _this.PeopleService.switchPerson(person, data.person);
                };
            }
            else {
                functionForDialogAfterconfirmation = function (data) {
                    _this.PeopleService.addPerson(data.person);
                };
            }
            this.ngDialog.open({
                template: '/templates/people/views/peopleAddNewModal.html',
                controller: 'peopleAddNewModalController',
                controllerAs: '$ctrl',
                resolve: {
                    person: function () { return personForDialog; },
                    id: function () { return 'NewPersonModalDialog'; },
                    edit: function () { return edit; }
                },
                preCloseCallback: function (data) {
                    if ((data) && (data.save)) {
                        functionForDialogAfterconfirmation(data);
                    }
                    return true;
                }
            });
        };
        peopleListController.$inject = ['ngDialog', 'PeopleService'];
        return peopleListController;
    }());
    /**
     * Shows the list of all people.
     * Allows adding a new person, editing and removing existing ones.
     *
     * @class peopleListComponent
     */
    var peopleListComponent = (function () {
        function peopleListComponent() {
            this.bindings = {};
            this.controller = peopleListController;
            this.controllerAs = '$ctrl';
            this.templateUrl = '/templates/people/views/peopleList.html';
        }
        return peopleListComponent;
    }());
    angular
        .module('people')
        .component('peopleListComponent', new peopleListComponent());
})(people || (people = {}));
;
