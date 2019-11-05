import { element, by, ElementFinder } from 'protractor';

export default class DriverUpdatePage {
  pageTitle: ElementFinder = element(by.id('uterApp.driver.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#driver-name'));
  surNameInput: ElementFinder = element(by.css('input#driver-surName'));
  licenseInput: ElementFinder = element(by.css('input#driver-license'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setSurNameInput(surName) {
    await this.surNameInput.sendKeys(surName);
  }

  async getSurNameInput() {
    return this.surNameInput.getAttribute('value');
  }

  async setLicenseInput(license) {
    await this.licenseInput.sendKeys(license);
  }

  async getLicenseInput() {
    return this.licenseInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
