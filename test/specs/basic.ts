import { expect } from 'chai';
import LoginPage from '../pageobjects/login.page';
import LandingPage from '../pageobjects/landing.page';
import CareerPage from '../pageobjects/career.page';

describe('webdriver.io page', () => {
	beforeEach(async () => {
		await LoginPage.open();
	});

	it('should click the Join the team button and should be redirected to the carrier page', async () => {
		await LandingPage.clickJoinTheTeamButton();
		const url = await browser.getUrl();
		expect(url).to.include('https://career.getir.com/');
	});

	it('on the carrier page should click the all opportunities button and search for the Tax Team Lead Position ', async () => {
		await LandingPage.clickJoinTheTeamButton();
		let url = await browser.getUrl();
		expect(url).to.include('https://career.getir.com/');
		await CareerPage.clickBtnAllOpportinities();
		url = await browser.getUrl();
		expect(url).to.include('https://career.getir.com/#job-section');
		await CareerPage.searchInputFillThePositionName('Tax');
		await CareerPage.searchAndPressEnter('Tax');
		expect(await CareerPage.isTaxTeamLeadVisible()).to.be.true;
	});
});
