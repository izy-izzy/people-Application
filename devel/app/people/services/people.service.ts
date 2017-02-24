///<reference path="../../../../main.d.ts" />

declare interface IPeopleService {

	/**
	 * Calls API to return the people from backend. 
	 * @memberOf IPeopleService
	 */
	loadPeople(): void;
	
	/**
	 * Updates the people list from the faked data.
	 * @memberOf IPeopleService
	 */
	loadFakePeople(): void;
	
	/**
	 * Returns a new person which is empty.
	 * @returns {IPerson} 
	 * 
	 * @memberOf IPeopleService
	 */
	getNewPerson(): IPerson;

	/**
	 * Adds a person to the people list.
	 * @param {IPerson} person 
	 * @returns {boolean} 
	 * 
	 * @memberOf IPeopleService
	 */
	addPerson(person:IPerson):boolean;
	
	/**
	 * Removes a person from the list of the people.
	 * @param {IPerson} person 
	 * @returns {boolean} Indicates if the person has been removed from people list.
	 * 
	 * @memberOf IPeopleService
	 */
	removePerson(person:IPerson):boolean;

	/**
	 * Switch a new person for the old one.
	 * The oldPerson is replaced by the newPerson.
	 * If the old one is not found no change to the people list is done.
	 * @param {IPerson} oldPerson 
	 * @param {IPerson} newPerson 
	 * @returns {boolean} Indicates if the person has been switched in people list.
	 * 
	 * @memberOf IPeopleService
	 */
	switchPerson(oldPerson:IPerson, newPerson:IPerson):boolean;
	
	/**
	 * Used for RXJS communication.
	 */
	isLoading: any; // is this service doing a loading of a new people list?
	people: any; // list of people 
	peopleLoadingError: any; // indicates wheteher en error has been encountered during loading of a people list.
}

namespace people {

	'use strict';

	class PeopleService implements IPeopleService {

		public people: any;
		public peopleLoadingError: any;
		public isLoading: any;
		private loadedPeople: IPerson[];

		static $inject: Array<string> = ['$q','API', 'rx'];
		constructor(private $q, private API:IAPI, private rx) {
			this.people = new this.rx.BehaviorSubject();
			this.peopleLoadingError = new this.rx.BehaviorSubject();
			this.isLoading = new this.rx.BehaviorSubject();
		}

		public loadPeople(): void{
			this.isLoading.onNext('true');
			this.API.people.query().$promise
				.then((resource) => {
					this.loadedPeople = resource;
					this.people.onNext(this.loadedPeople);
					this.peopleLoadingError.onNext(false);
				}, (error) => {
					this.loadedPeople = [];
					this.people.onNext(null);
					this.peopleLoadingError.onNext(true);
				}).finally(() => {
					this.isLoading.onNext(false);
				})
		}

		public addPerson(person:IPerson):boolean{
			if (angular.isDefined(person) && (person !== null)){
				this.loadedPeople.push(person);
				this.people.onNext(this.loadedPeople);
				return true;
			} else { 
				return false;
			}
		}

		public switchPerson(oldPerson:IPerson, newPerson:IPerson):boolean{
			let personIndex = this.getPersonIndexInPeopleList(oldPerson);
			if (personIndex > -1){
				this.loadedPeople[personIndex] = newPerson;
				this.people.onNext(this.loadedPeople);
				return true;
			} else {
				return false;
			}
		}

		/**
		 * Returns index of a person in a people list.
		 * @private
		 * @param {IPerson} person 
		 * @returns {number} -1 if person has not been found.
		 * 
		 * @memberOf PeopleService
		 */
		private getPersonIndexInPeopleList(person:IPerson):number{
			let personIndex = -1;
			// could use a find method but IE still does not support it
			// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/find
			if (angular.isDefined(person) && (person !== null)){
				for (var index = 0; index < this.loadedPeople.length; index++){
					this.comparePersons(person,this.loadedPeople[index]) ? personIndex = index : null;
				}
			}
			return personIndex;
		}

		public removePerson(person:IPerson):boolean{
			if (angular.isDefined(person) && (person !== null)){
				let personIndex = this.getPersonIndexInPeopleList(person);
				if (personIndex > -1){
					this.loadedPeople.splice(personIndex,1);
					this.people.onNext(this.loadedPeople);
					return true;
				} else {
					return false;
				}
			}
		}

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
		private comparePersons(personA:IPerson, personB:IPerson): boolean{
			let samePerson = true;
			if (angular.isDefined(personA) && (personA !== null) && angular.isDefined(personB) && (personB !== null)){
				personA.name !== personB.name ? samePerson = false: null;
				personA.avatar !== personB.avatar ? samePerson = false: null;
				personA.email !== personB.email ? samePerson = false: null;
				personA.job !== personB.job ? samePerson = false: null;
				personA.location !== personB.location ? samePerson = false: null;
				personA.tag !== personB.tag ? samePerson = false: null;
			} else {
				samePerson = false;
			}
			return samePerson;
		}

		public loadFakePeople(): IPerson[]{
			let fakePeople = [
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
				},{
					"name": "clementine bauch",
					"email": "clementine@gmail.com",
					"job": "web developer",
					"location": "liverpool",
					"tag": "following",
					"avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
				},{
					"name": "chelsey dietrich",
					"email": "chelsey@gmail.com",
					"job": "baker",
					"location": "london",
					"tag": "family",
					"avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
				},{
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
		}

		public getNewPerson(): IPerson {
			let person:IPerson = {
				avatar: '',
				email: '',
				job: '',
				location: '',
				name: '',
				tag: ''
			}
			return person;
		}
	}

	angular
		.module('people')
		.service('PeopleService', PeopleService);

}
