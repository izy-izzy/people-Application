///<reference path="../../../../main.d.ts" />

// RXJS does not have a good typescript file thus this is required.
interface TestableScheduler extends Rx.VirtualTimeScheduler<any,any>{
	scheduleAbsolute: Function;
}

describe('People', () => {

	let $scope;

	beforeEach(angular.mock.module('peopleApp'));
	beforeEach(inject(($rootScope) => {
		$scope = $rootScope.$new();
	}));

	afterEach(function() {
		$scope.$apply();
	});

	describe('Service', () => {

		let PeopleService: IPeopleService;
		let $httpBackend;
		beforeEach(inject(($injector) => {
			PeopleService = $injector.get('PeopleService');
			$httpBackend = $injector.get('$httpBackend');
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		let fakePerson1 = {
			"name": "leanne graham",
			"email": "leanne@gmail.com",
			"job": "web developer",
			"location": "london",
			"tag": "friends",
			"avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
		}

		let fakePerson2 = {
			"name": "ervin howell",
			"email": "ervin@gmail.com",
			"job": "tech lead",
			"location": "london",
			"tag": "friends",
			"avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
		}
		
		let fakePerson3 = {
			"name": "clementine bauch",
			"email": "clementine@gmail.com",
			"job": "web developer",
			"location": "liverpool",
			"tag": "following",
			"avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
		}
		
		let fakePerson4 = {
			"name": "chelsey dietrich",
			"email": "chelsey@gmail.com",
			"job": "baker",
			"location": "london",
			"tag": "family",
			"avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
		}
		
		let fakePerson5 = {
			"name": "dennis schulist",
			"email": "dennis@gmail.com",
			"job": "pen tester",
			"location": "manchester",
			"tag": "acquaintance",
			"avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
		}

		let fakePersonAdd = {
			"name": "Added Person",
			"email": "added@person.com",
			"job": "awesome job",
			"location": "london",
			"tag": "tagged",
			"avatar": "fail"
		}

		let fakePeople = [
			fakePerson1, fakePerson2, fakePerson3, fakePerson4, fakePerson5
		];

		let fakePeopleDeleted = [
			fakePerson1, fakePerson2, fakePerson4, fakePerson5
		]

		let fakePeopleAdded = [
			fakePerson1, fakePerson2, fakePerson3, fakePerson4, fakePerson5, fakePersonAdd
		]

		let fakePerson:IPerson = {
			avatar: '',
			email: '',
			job: '',
			location: '',
			name: '',
			tag: ''
		}

		it('should be present', () => {
			expect(PeopleService).toBeDefined();
		});

		it('should try to call valid API', () => {
			$httpBackend.expectGET('http://www.mocky.io/v2/58ac4bbc100000050f514b08')
				.respond(200, {msg: 'ok'});
			PeopleService.loadPeople();
			$httpBackend.flush();
		});

		it('should load a fake pepople', () => {
			let scheduler:Rx.VirtualTimeScheduler<any,any> = new Rx.TestScheduler();
			let castedScheduler = <TestableScheduler>scheduler;
			let people:IPerson[];

			PeopleService.people.subscribe((data) => {
				people = data;
			});

			castedScheduler.scheduleAbsolute(null, new Date(1), () => { 
				expect(people).toEqual(undefined);
			});

			castedScheduler.scheduleAbsolute(null, new Date(2), () => { 
				PeopleService.loadFakePeople();
			});

			castedScheduler.scheduleAbsolute(null, new Date(3), () => {
				expect(people).toEqual(fakePeople);
				scheduler.stop(); 
			});

			scheduler.start();

		});

		it('should get a new person', () => {
			let newPerson = PeopleService.getNewPerson();
			expect(newPerson).toEqual(fakePerson);
		});

		it('should remove person (valid)', () => {

			let scheduler:Rx.VirtualTimeScheduler<any,any> = new Rx.TestScheduler();
			let castedScheduler = <TestableScheduler>scheduler;
			let people:IPerson[];

			PeopleService.people.subscribe((data) => {
				people = data;
			});

			castedScheduler.scheduleAbsolute(null, new Date(1), () => { 
				expect(people).toEqual(undefined);
			});

			castedScheduler.scheduleAbsolute(null, new Date(2), () => { 
				PeopleService.loadFakePeople();
				PeopleService.removePerson(fakePerson3);
			});

			castedScheduler.scheduleAbsolute(null, new Date(3), () => {
				expect(people).toEqual(fakePeopleDeleted);
				scheduler.stop(); 
			});

			scheduler.start();
		});

		it('should remove person (no-valid)', () => {

			let scheduler:Rx.VirtualTimeScheduler<any,any> = new Rx.TestScheduler();
			let castedScheduler = <TestableScheduler>scheduler;
			let people:IPerson[];

			PeopleService.people.subscribe((data) => {
				people = data;
			});

			castedScheduler.scheduleAbsolute(null, new Date(1), () => { 
				expect(people).toEqual(undefined);
			});

			castedScheduler.scheduleAbsolute(null, new Date(2), () => { 
				PeopleService.loadFakePeople();
				PeopleService.removePerson(null);
			});

			castedScheduler.scheduleAbsolute(null, new Date(3), () => {
				expect(people).toEqual(fakePeople);
				scheduler.stop(); 
			});

			scheduler.start();
		});

		it('should add person (valid)', () => {

			let scheduler:Rx.VirtualTimeScheduler<any,any> = new Rx.TestScheduler();
			let castedScheduler = <TestableScheduler>scheduler;
			let people:IPerson[];

			PeopleService.people.subscribe((data) => {
				people = data;
			});

			castedScheduler.scheduleAbsolute(null, new Date(1), () => { 
				expect(people).toEqual(undefined);
			});

			castedScheduler.scheduleAbsolute(null, new Date(2), () => { 
				PeopleService.loadFakePeople();
				var success = PeopleService.addPerson(fakePersonAdd);
				expect(success).toEqual(true);
			});

			castedScheduler.scheduleAbsolute(null, new Date(3), () => {
				expect(people).toEqual(fakePeopleAdded);
				scheduler.stop(); 
			});

			scheduler.start();
		})

		it('should add person (non-valid)', () => {

			let scheduler:Rx.VirtualTimeScheduler<any,any> = new Rx.TestScheduler();
			let castedScheduler = <TestableScheduler>scheduler;
			let people:IPerson[];

			PeopleService.people.subscribe((data) => {
				people = data;
			});

			castedScheduler.scheduleAbsolute(null, new Date(1), () => { 
				expect(people).toEqual(undefined);
			});

			castedScheduler.scheduleAbsolute(null, new Date(2), () => { 
				PeopleService.loadFakePeople();
				var success = PeopleService.addPerson(null);
				expect(success).toEqual(false);
			});

			castedScheduler.scheduleAbsolute(null, new Date(3), () => {
				expect(people).toEqual(fakePeople);
				scheduler.stop(); 
			});

			scheduler.start();
		})

	});
});