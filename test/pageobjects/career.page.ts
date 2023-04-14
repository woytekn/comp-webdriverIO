import { ChainablePromiseElement } from 'webdriverio';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CareerPage {
	/**
	 * define selectors using getter methods
	 */
	public get btnAllOpportinities() {
		return $('a*=All opportunities');
	}

	public get searchInput() {
		return $('#search_input');
	}

	public get turkeyTaxTeamLead() {
		return $('div[name="Tax Team Lead"]');
	}

	/**
	 * define methods using defined locators
	 */

	public async clickBtnAllOpportinities() {
		await this.btnAllOpportinities.click();
	}

	public async searchInputFillThePositionName(positionName: string) {
		(await this.searchInput).addValue(positionName);
	}

	public async searchAndPressEnter(positionName: string) {
		const searchInput = await this.searchInput;
		await searchInput.waitForDisplayed();
		await searchInput.setValue(positionName);
		await browser.keys('\uE007');
	}

	public async isTaxTeamLeadVisible(): Promise<boolean> {
		const styleProperty = await this.turkeyTaxTeamLead.getCSSProperty('style');
		return styleProperty.value.indexOf('none') === -1;
	}
}

export default new CareerPage();
