import { ChainablePromiseElement } from 'webdriverio';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LandingPage {
	/**
	 * define selectors using getter methods
	 */
	public get btnJoinTheTeam() {
		return $('a*=Join the team');
	}

	/**
	 * define methods using defined locators
	 */

	public async clickJoinTheTeamButton() {
		await this.btnJoinTheTeam.click();
		await browser.waitUntil(
			async () => {
				const url = await browser.getUrl();
				return url.includes('https://career.getir.com');
			},
			{
				timeout: 5000,
				timeoutMsg: 'Expected URL to include https://career.getir.com/',
			}
		);
	}
}

export default new LandingPage();
