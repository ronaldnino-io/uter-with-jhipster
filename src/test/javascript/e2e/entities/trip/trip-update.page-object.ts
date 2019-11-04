import { element, by, ElementFinder } from 'protractor';

export default class TripUpdatePage {
  pageTitle: ElementFinder = element(by.id('uterApp.trip.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateInput: ElementFinder = element(by.css('input#trip-date'));
  driverSelect: ElementFinder = element(by.css('select#trip-driver'));
  vehicleSelect: ElementFinder = element(by.css('select#trip-vehicle'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async driverSelectLastOption() {
    await this.driverSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async driverSelectOption(option) {
    await this.driverSelect.sendKeys(option);
  }

  getDriverSelect() {
    return this.driverSelect;
  }

  async getDriverSelectedOption() {
    return this.driverSelect.element(by.css('option:checked')).getText();
  }

  async vehicleSelectLastOption() {
    await this.vehicleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async vehicleSelectOption(option) {
    await this.vehicleSelect.sendKeys(option);
  }

  getVehicleSelect() {
    return this.vehicleSelect;
  }

  async getVehicleSelectedOption() {
    return this.vehicleSelect.element(by.css('option:checked')).getText();
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
