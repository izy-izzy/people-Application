///<reference path="../../../../main.d.ts" />
var people;
(function (people) {
    'use strict';
    /**
     * Controller for a modal window. After closing the modal window sends the
     * data according whether to save this person on not.
     *
     * @class peopleAddNewModalController
     */
    var peopleAddNewModalController = (function () {
        function peopleAddNewModalController(ngDialog, id, person, edit) {
            this.ngDialog = ngDialog;
            this.id = id;
            this.person = person;
            this.edit = edit;
            this.personToEdit = angular.copy(this.person);
        }
        /**
         * Cancel this dialog.
         * @memberOf peopleAddNewModalController
         */
        peopleAddNewModalController.prototype.cancel = function () {
            var data = {
                save: false
            };
            this.ngDialog.close(this.id, data);
        };
        /**
         * Close this dialog and add a new person to response from this dialog.
         * @memberOf peopleAddNewModalController
         */
        peopleAddNewModalController.prototype.addNewPerson = function () {
            var data = {
                save: true,
                person: this.personToEdit
            };
            this.ngDialog.close(this.id, data);
        };
        peopleAddNewModalController.$inject = ['ngDialog', 'id', 'person', 'edit'];
        return peopleAddNewModalController;
    }());
    angular
        .module('people')
        .controller('peopleAddNewModalController', peopleAddNewModalController);
})(people || (people = {}));
;
