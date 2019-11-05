import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleComponentsPage, { VehicleDeleteDialog } from './vehicle.page-object';
import VehicleUpdatePage from './vehicle-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Vehicle e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleComponentsPage: VehicleComponentsPage;
  let vehicleUpdatePage: VehicleUpdatePage;
  let vehicleDeleteDialog: VehicleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Vehicles', async () => {
    await navBarPage.getEntityPage('vehicle');
    vehicleComponentsPage = new VehicleComponentsPage();
    expect(await vehicleComponentsPage.getTitle().getText()).to.match(/Vehicles/);
  });

  it('should load create Vehicle page', async () => {
    await vehicleComponentsPage.clickOnCreateButton();
    vehicleUpdatePage = new VehicleUpdatePage();
    expect(await vehicleUpdatePage.getPageTitle().getAttribute('id')).to.match(/uterApp.vehicle.home.createOrEditLabel/);
    await vehicleUpdatePage.cancel();
  });

  it('should create and save Vehicles', async () => {
    async function createVehicle() {
      await vehicleComponentsPage.clickOnCreateButton();
      await vehicleUpdatePage.setBrandInput('brand');
      expect(await vehicleUpdatePage.getBrandInput()).to.match(/brand/);
      await vehicleUpdatePage.setModelInput('model');
      expect(await vehicleUpdatePage.getModelInput()).to.match(/model/);
      await vehicleUpdatePage.setPlateInput('plate');
      expect(await vehicleUpdatePage.getPlateInput()).to.match(/plate/);
      await vehicleUpdatePage.setLicenseRequiredInput('licenseRequired');
      expect(await vehicleUpdatePage.getLicenseRequiredInput()).to.match(/licenseRequired/);
      await waitUntilDisplayed(vehicleUpdatePage.getSaveButton());
      await vehicleUpdatePage.save();
      await waitUntilHidden(vehicleUpdatePage.getSaveButton());
      expect(await vehicleUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createVehicle();
    await vehicleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await vehicleComponentsPage.countDeleteButtons();
    await createVehicle();

    await vehicleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await vehicleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Vehicle', async () => {
    await vehicleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await vehicleComponentsPage.countDeleteButtons();
    await vehicleComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    vehicleDeleteDialog = new VehicleDeleteDialog();
    expect(await vehicleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/uterApp.vehicle.delete.question/);
    await vehicleDeleteDialog.clickOnConfirmButton();

    await vehicleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await vehicleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
