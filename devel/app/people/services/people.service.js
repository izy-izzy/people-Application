///<reference path="../../../../main.d.ts" />
var people;
(function (people) {
    'use strict';
    var PeopleService = (function () {
        function PeopleService($q, API, rx) {
            this.$q = $q;
            this.API = API;
            this.rx = rx;
            this.people = new this.rx.BehaviorSubject();
            this.peopleLoadingError = new this.rx.BehaviorSubject();
            this.isLoading = new this.rx.BehaviorSubject();
        }
        PeopleService.prototype.loadPeople = function () {
            var _this = this;
            this.isLoading.onNext('true');
            this.API.people.query().$promise
                .then(function (resource) {
                _this.loadedPeople = resource;
                _this.people.onNext(_this.loadedPeople);
                _this.peopleLoadingError.onNext(false);
            }, function (error) {
                _this.loadedPeople = [];
                _this.people.onNext(null);
                _this.peopleLoadingError.onNext(true);
            }).finally(function () {
                _this.isLoading.onNext(false);
            });
        };
        PeopleService.prototype.addPerson = function (person) {
            if (angular.isDefined(person) && (person !== null)) {
                this.loadedPeople.push(person);
                this.people.onNext(this.loadedPeople);
                return true;
            }
            else {
                return false;
            }
        };
        PeopleService.prototype.switchPerson = function (oldPerson, newPerson) {
            var personIndex = this.getPersonIndexInPeopleList(oldPerson);
            if (personIndex > -1) {
                this.loadedPeople[personIndex] = newPerson;
                this.people.onNext(this.loadedPeople);
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Returns index of a person in a people list.
         * @private
         * @param {IPerson} person
         * @returns {number} -1 if person has not been found.
         *
         * @memberOf PeopleService
         */
        PeopleService.prototype.getPersonIndexInPeopleList = function (person) {
            var personIndex = -1;
            // could use a find method but IE still does not support it
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/find
            if (angular.isDefined(person) && (person !== null)) {
                for (var index = 0; index < this.loadedPeople.length; index++) {
                    this.comparePersons(person, this.loadedPeople[index]) ? personIndex = index : null;
                }
            }
            return personIndex;
        };
        PeopleService.prototype.removePerson = function (person) {
            if (angular.isDefined(person) && (person !== null)) {
                var personIndex = this.getPersonIndexInPeopleList(person);
                if (personIndex > -1) {
                    this.loadedPeople.splice(personIndex, 1);
                    this.people.onNext(this.loadedPeople);
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        /**
         * Compare the persons according to all of their values.
         * If two different persons have the same values they are considered the same.
         * There is no ID for the PERSON object at the moment. It would be better to have this property.
         * @private
         * @param {IPerson} personA
         * @param {IPerson} personB
         * @returns {boolean}
         *
         * @memberOf PeopleService
         */
        PeopleService.prototype.comparePersons = function (personA, personB) {
            var samePerson = true;
            if (angular.isDefined(personA) && (personA !== null) && angular.isDefined(personB) && (personB !== null)) {
                personA.name !== personB.name ? samePerson = false : null;
                personA.avatar !== personB.avatar ? samePerson = false : null;
                personA.email !== personB.email ? samePerson = false : null;
                personA.job !== personB.job ? samePerson = false : null;
                personA.location !== personB.location ? samePerson = false : null;
                personA.tag !== personB.tag ? samePerson = false : null;
            }
            else {
                samePerson = false;
            }
            return samePerson;
        };
        PeopleService.prototype.loadFakePeople = function () {
            var fakePeople = [
                {
                    "name": "leanne graham",
                    "email": "leanne@gmail.com",
                    "job": "web developer",
                    "location": "london",
                    "tag": "friends",
                    "avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
                },
                {
                    "name": "ervin howell",
                    "email": "ervin@gmail.com",
                    "job": "tech lead",
                    "location": "london",
                    "tag": "friends",
                    "avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
                }, {
                    "name": "clementine bauch",
                    "email": "clementine@gmail.com",
                    "job": "web developer",
                    "location": "liverpool",
                    "tag": "following",
                    "avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
                }, {
                    "name": "chelsey dietrich",
                    "email": "chelsey@gmail.com",
                    "job": "baker",
                    "location": "london",
                    "tag": "family",
                    "avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
                }, {
                    "name": "dennis schulist",
                    "email": "dennis@gmail.com",
                    "job": "pen tester",
                    "location": "manchester",
                    "tag": "acquaintance",
                    "avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
                }
            ];
            this.people.onNext(fakePeople);
            this.loadedPeople = angular.copy(fakePeople);
            this.peopleLoadingError.onNext(false);
            return fakePeople;
        };
        PeopleService.prototype.getNewPerson = function () {
            var person = {
                avatar: '',
                email: '',
                job: '',
                location: '',
                name: '',
                tag: ''
            };
            return person;
        };
        PeopleService.$inject = ['$q', 'API', 'rx'];
        return PeopleService;
    }());
    angular
        .module('people')
        .service('PeopleService', PeopleService);
})(people || (people = {}));
