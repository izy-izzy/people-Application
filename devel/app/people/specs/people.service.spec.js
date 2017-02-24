///<reference path="../../../../main.d.ts" />
describe('People', function () {
    var $scope;
    beforeEach(angular.mock.module('peopleApp'));
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));
    afterEach(function () {
        $scope.$apply();
    });
    describe('Service', function () {
        var PeopleService;
        var $httpBackend;
        beforeEach(inject(function ($injector) {
            PeopleService = $injector.get('PeopleService');
            $httpBackend = $injector.get('$httpBackend');
        }));
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        var fakePerson1 = {
            "name": "leanne graham",
            "email": "leanne@gmail.com",
            "job": "web developer",
            "location": "london",
            "tag": "friends",
            "avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
        };
        var fakePerson2 = {
            "name": "ervin howell",
            "email": "ervin@gmail.com",
            "job": "tech lead",
            "location": "london",
            "tag": "friends",
            "avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
        };
        var fakePerson3 = {
            "name": "clementine bauch",
            "email": "clementine@gmail.com",
            "job": "web developer",
            "location": "liverpool",
            "tag": "following",
            "avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
        };
        var fakePerson4 = {
            "name": "chelsey dietrich",
            "email": "chelsey@gmail.com",
            "job": "baker",
            "location": "london",
            "tag": "family",
            "avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
        };
        var fakePerson5 = {
            "name": "dennis schulist",
            "email": "dennis@gmail.com",
            "job": "pen tester",
            "location": "manchester",
            "tag": "acquaintance",
            "avatar": "http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png"
        };
        var fakePersonAdd = {
            "name": "Added Person",
            "email": "added@person.com",
            "job": "awesome job",
            "location": "london",
            "tag": "tagged",
            "avatar": "fail"
        };
        var fakePeople = [
            fakePerson1, fakePerson2, fakePerson3, fakePerson4, fakePerson5
        ];
        var fakePeopleDeleted = [
            fakePerson1, fakePerson2, fakePerson4, fakePerson5
        ];
        var fakePeopleAdded = [
            fakePerson1, fakePerson2, fakePerson3, fakePerson4, fakePerson5, fakePersonAdd
        ];
        var fakePerson = {
            avatar: '',
            email: '',
            job: '',
            location: '',
            name: '',
            tag: ''
        };
        it('should be present', function () {
            expect(PeopleService).toBeDefined();
        });
        it('should try to call valid API', function () {
            $httpBackend.expectGET('http://www.mocky.io/v2/58ac4bbc100000050f514b08')
                .respond(200, { msg: 'ok' });
            PeopleService.loadPeople();
            $httpBackend.flush();
        });
        it('should load a fake pepople', function () {
            var scheduler = new Rx.TestScheduler();
            var castedScheduler = scheduler;
            var people;
            PeopleService.people.subscribe(function (data) {
                people = data;
            });
            castedScheduler.scheduleAbsolute(null, new Date(1), function () {
                expect(people).toEqual(undefined);
            });
            castedScheduler.scheduleAbsolute(null, new Date(2), function () {
                PeopleService.loadFakePeople();
            });
            castedScheduler.scheduleAbsolute(null, new Date(3), function () {
                expect(people).toEqual(fakePeople);
                scheduler.stop();
            });
            scheduler.start();
        });
        it('should get a new person', function () {
            var newPerson = PeopleService.getNewPerson();
            expect(newPerson).toEqual(fakePerson);
        });
        it('should remove person (valid)', function () {
            var scheduler = new Rx.TestScheduler();
            var castedScheduler = scheduler;
            var people;
            PeopleService.people.subscribe(function (data) {
                people = data;
            });
            castedScheduler.scheduleAbsolute(null, new Date(1), function () {
                expect(people).toEqual(undefined);
            });
            castedScheduler.scheduleAbsolute(null, new Date(2), function () {
                PeopleService.loadFakePeople();
                PeopleService.removePerson(fakePerson3);
            });
            castedScheduler.scheduleAbsolute(null, new Date(3), function () {
                expect(people).toEqual(fakePeopleDeleted);
                scheduler.stop();
            });
            scheduler.start();
        });
        it('should remove person (no-valid)', function () {
            var scheduler = new Rx.TestScheduler();
            var castedScheduler = scheduler;
            var people;
            PeopleService.people.subscribe(function (data) {
                people = data;
            });
            castedScheduler.scheduleAbsolute(null, new Date(1), function () {
                expect(people).toEqual(undefined);
            });
            castedScheduler.scheduleAbsolute(null, new Date(2), function () {
                PeopleService.loadFakePeople();
                PeopleService.removePerson(null);
            });
            castedScheduler.scheduleAbsolute(null, new Date(3), function () {
                expect(people).toEqual(fakePeople);
                scheduler.stop();
            });
            scheduler.start();
        });
        it('should add person (valid)', function () {
            var scheduler = new Rx.TestScheduler();
            var castedScheduler = scheduler;
            var people;
            PeopleService.people.subscribe(function (data) {
                people = data;
            });
            castedScheduler.scheduleAbsolute(null, new Date(1), function () {
                expect(people).toEqual(undefined);
            });
            castedScheduler.scheduleAbsolute(null, new Date(2), function () {
                PeopleService.loadFakePeople();
                var success = PeopleService.addPerson(fakePersonAdd);
                expect(success).toEqual(true);
            });
            castedScheduler.scheduleAbsolute(null, new Date(3), function () {
                expect(people).toEqual(fakePeopleAdded);
                scheduler.stop();
            });
            scheduler.start();
        });
        it('should add person (non-valid)', function () {
            var scheduler = new Rx.TestScheduler();
            var castedScheduler = scheduler;
            var people;
            PeopleService.people.subscribe(function (data) {
                people = data;
            });
            castedScheduler.scheduleAbsolute(null, new Date(1), function () {
                expect(people).toEqual(undefined);
            });
            castedScheduler.scheduleAbsolute(null, new Date(2), function () {
                PeopleService.loadFakePeople();
                var success = PeopleService.addPerson(null);
                expect(success).toEqual(false);
            });
            castedScheduler.scheduleAbsolute(null, new Date(3), function () {
                expect(people).toEqual(fakePeople);
                scheduler.stop();
            });
            scheduler.start();
        });
    });
});
