describe('People application', () => {

	it('should have a title', () => {
		browser.get('http://localhost:8080/');
		expect(browser.getTitle()).toEqual('People application');
	});

});