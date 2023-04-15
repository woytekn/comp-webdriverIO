import { expect } from 'chai';
import LoginPage from '../pageobjects/login.page';
import LandingPage from '../pageobjects/landing.page';
import CareerPage from '../pageobjects/career.page';

const careerGetirUrl = 'https://career.getir.com/';
const valueJobPosition = 'Tax';
const locatorTaxTeamLead = 'div[name="Tax Team Lead"]';

describe('webdriver.io page', () => {
	beforeEach(async () => {
		await LoginPage.open();
	});

	it('should click the Join the team button and should be redirected to the carrier page', async () => {
		await LandingPage.clickJoinTheTeamButton();
		const url = await browser.getUrl();
		expect(url).to.include(careerGetirUrl);
	});

	it('on the carrier page should click the all opportunities button and search for the Tax Team Lead Position ', async () => {
		await LandingPage.clickJoinTheTeamButton();
		let url = await browser.getUrl();
		expect(url).to.include(careerGetirUrl);
		await CareerPage.clickBtnAllOpportinities();
		url = await browser.getUrl();
		expect(url).to.include('#job-section');
		await CareerPage.searchAndPressEnter(valueJobPosition);
		expect(await CareerPage.isTaxTeamLeadVisible()).to.be.true;
	});

	it('mock data and not display the Tax Team Lead position ', async () => {
		const taxTeamLeadDiv = await browser.$(locatorTaxTeamLead);

		const mockResponse = require('../../mock.json');
		const mockCareerPage = await browser.mock(
			'**/v1/boards/getir/departments?render_as=tree'
		);
		await LandingPage.clickJoinTheTeamButton();
		mockCareerPage.respond(mockResponse);
		await CareerPage.searchAndPressEnter(valueJobPosition);
		expect(await taxTeamLeadDiv.isDisplayed()).to.be.false;
	});
});
