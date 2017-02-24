describe('People module', () => {

	it('should be able to add new person', () => {
		
		var EC = protractor.ExpectedConditions;

		browser.get('http://localhost:8080/');
		var addNewPersonButton = element(by.id('addPersonButton'));
		addNewPersonButton.click();

		var nameInput = element(by.css('input[name="personName"]'));
		nameInput.sendKeys('James Brown The best one');
		var emailInput = element(by.css('input[name="personEmail"]'));
		emailInput.sendKeys('awesome@email.com');

		var submitButton = element(by.id('submitAddNewPerson'));
		var isClickable = EC.elementToBeClickable(submitButton);
		browser.wait(isClickable, 1000);
		submitButton.click();

		var personHeadingH3 = element(by.cssContainingText('.person .person__header .person-heading', 'James Brown The best one'));
		browser.wait(EC.visibilityOf(personHeadingH3), 2000);

		browser.sleep(100);
		
	});
});