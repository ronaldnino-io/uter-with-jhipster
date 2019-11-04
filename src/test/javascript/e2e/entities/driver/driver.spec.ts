import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DriverComponentsPage, { DriverDeleteDialog } from './driver.page-object';
import DriverUpdatePage from './driver-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Driver e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let driverComponentsPage: DriverComponentsPage;
  let driverUpdatePage: DriverUpdatePage;
  let driverDeleteDialog: DriverDeleteDialog;

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

  it('should load Drivers', async () => {
    await navBarPage.getEntityPage('driver');
    driverComponentsPage = new DriverComponentsPage();
    expect(await driverComponentsPage.getTitle().getText()).to.match(/Drivers/);
  });

  it('should load create Driver page', async () => {
    await driverComponentsPage.clickOnCreateButton();
    driverUpdatePage = new DriverUpdatePage();
    expect(await driverUpdatePage.getPageTitle().getAttribute('id')).to.match(/uterApp.driver.home.createOrEditLabel/);
    await driverUpdatePage.cancel();
  });

  it('should create and save Drivers', async () => {
    async function createDriver() {
      await driverComponentsPage.clickOnCreateButton();
      await driverUpdatePage.setNameInput('name');
      expect(await driverUpdatePage.getNameInput()).to.match(/name/);
      await driverUpdatePage.setSurNameInput('surName');
      expect(await driverUpdatePage.getSurNameInput()).to.match(/surName/);
      await driverUpdatePage.setLicenseInput('license');
      expect(await driverUpdatePage.getLicenseInput()).to.match(/license/);
      await waitUntilDisplayed(driverUpdatePage.getSaveButton());
      await driverUpdatePage.save();
      await waitUntilHidden(driverUpdatePage.getSaveButton());
      expect(await driverUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createDriver();
    await driverComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await driverComponentsPage.countDeleteButtons();
    await createDriver();

    await driverComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await driverComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Driver', async () => {
    await driverComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await driverComponentsPage.countDeleteButtons();
    await driverComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    driverDeleteDialog = new DriverDeleteDialog();
    expect(await driverDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/uterApp.driver.delete.question/);
    await driverDeleteDialog.clickOnConfirmButton();

    await driverComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await driverComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
