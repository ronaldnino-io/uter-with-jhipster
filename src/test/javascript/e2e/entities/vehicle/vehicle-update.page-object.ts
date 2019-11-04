import { element, by, ElementFinder } from 'protractor';

export default class VehicleUpdatePage {
  pageTitle: ElementFinder = element(by.id('uterApp.vehicle.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  brandInput: ElementFinder = element(by.css('input#vehicle-brand'));
  modelInput: ElementFinder = element(by.css('input#vehicle-model'));
  plateInput: ElementFinder = element(by.css('input#vehicle-plate'));
  licenseRequiredInput: ElementFinder = element(by.css('input#vehicle-licenseRequired'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBrandInput(brand) {
    await this.brandInput.sendKeys(brand);
  }

  async getBrandInput() {
    return this.brandInput.getAttribute('value');
  }

  async setModelInput(model) {
    await this.modelInput.sendKeys(model);
  }

  async getModelInput() {
    return this.modelInput.getAttribute('value');
  }

  async setPlateInput(plate) {
    await this.plateInput.sendKeys(plate);
  }

  async getPlateInput() {
    return this.plateInput.getAttribute('value');
  }

  async setLicenseRequiredInput(licenseRequired) {
    await this.licenseRequiredInput.sendKeys(licenseRequired);
  }

  async getLicenseRequiredInput() {
    return this.licenseRequiredInput.getAttribute('value');
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
