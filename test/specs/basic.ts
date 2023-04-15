import { expect } from 'chai';
import LoginPage from '../pageobjects/login.page';
import LandingPage from '../pageobjects/landing.page';
import CareerPage from '../pageobjects/career.page';
const percySnapshot = require('@percy/webdriverio');

interface TestData {
	careerGetirUrl: string;
	jobPosition: string;
	taxTeamLeadLocator: string;
}

const testData: TestData = {
	careerGetirUrl: 'https://career.getir.com/',
	jobPosition: 'Tax',
	taxTeamLeadLocator: 'div[name="Tax Team Lead"]',
};

describe('Career Page Tests', () => {
	beforeEach(async () => {
		await LoginPage.open();
	});

	it('should click the Join the team button and should be redirected to the carrier page', async () => {
		await LandingPage.clickJoinTheTeamButton();
		await percySnapshot(browser, 'Login Page');
		const currentUrl = await browser.getUrl();
		expect(currentUrl).to.include(testData.careerGetirUrl);
	});

	it('should search for the Tax Team Lead position on the career page', async () => {
		await LandingPage.clickJoinTheTeamButton();
		const currentUrl = await browser.getUrl();
		expect(currentUrl).to.include(testData.careerGetirUrl);

		await CareerPage.clickBtnAllOpportinities();
		const jobSectionUrl = await browser.getUrl();
		expect(jobSectionUrl).to.include('#job-section');

		await CareerPage.searchAndPressEnter(testData.jobPosition);
		expect(await CareerPage.isTaxTeamLeadVisible()).to.be.true;
	});

	it('should not display the Tax Team Lead position when mock data is used', async () => {
		const taxTeamLeadDiv = await browser.$(testData.taxTeamLeadLocator);

		const mockResponse = require('../../mock.json');
		const mockCareerPage = await browser.mock(
			'**/v1/boards/getir/departments?render_as=tree'
		);
		await LandingPage.clickJoinTheTeamButton();
		mockCareerPage.respond(mockResponse);

		await CareerPage.searchAndPressEnter(testData.jobPosition);
		expect(await taxTeamLeadDiv.isDisplayed()).to.be.false;
	});
});
