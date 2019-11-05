import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TripComponentsPage, { TripDeleteDialog } from './trip.page-object';
import TripUpdatePage from './trip-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Trip e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tripComponentsPage: TripComponentsPage;
  let tripUpdatePage: TripUpdatePage;
  let tripDeleteDialog: TripDeleteDialog;

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

  it('should load Trips', async () => {
    await navBarPage.getEntityPage('trip');
    tripComponentsPage = new TripComponentsPage();
    expect(await tripComponentsPage.getTitle().getText()).to.match(/Trips/);
  });

  it('should load create Trip page', async () => {
    await tripComponentsPage.clickOnCreateButton();
    tripUpdatePage = new TripUpdatePage();
    expect(await tripUpdatePage.getPageTitle().getAttribute('id')).to.match(/uterApp.trip.home.createOrEditLabel/);
    await tripUpdatePage.cancel();
  });

  it('should create and save Trips', async () => {
    async function createTrip() {
      await tripComponentsPage.clickOnCreateButton();
      await tripUpdatePage.setDateInput('01-01-2001');
      expect(await tripUpdatePage.getDateInput()).to.eq('2001-01-01');
      await tripUpdatePage.driverSelectLastOption();
      await tripUpdatePage.vehicleSelectLastOption();
      await waitUntilDisplayed(tripUpdatePage.getSaveButton());
      await tripUpdatePage.save();
      await waitUntilHidden(tripUpdatePage.getSaveButton());
      expect(await tripUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createTrip();
    await tripComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await tripComponentsPage.countDeleteButtons();
    await createTrip();

    await tripComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await tripComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Trip', async () => {
    await tripComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await tripComponentsPage.countDeleteButtons();
    await tripComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    tripDeleteDialog = new TripDeleteDialog();
    expect(await tripDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/uterApp.trip.delete.question/);
    await tripDeleteDialog.clickOnConfirmButton();

    await tripComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await tripComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
