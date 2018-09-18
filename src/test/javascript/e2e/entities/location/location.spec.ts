/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LocationComponentsPage, LocationDeleteDialog, LocationUpdatePage } from './location.page-object';

const expect = chai.expect;

describe('Location e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let locationUpdatePage: LocationUpdatePage;
    let locationComponentsPage: LocationComponentsPage;
    let locationDeleteDialog: LocationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Locations', async () => {
        await navBarPage.goToEntity('location');
        locationComponentsPage = new LocationComponentsPage();
        expect(await locationComponentsPage.getTitle()).to.eq('jhiApp.location.home.title');
    });

    it('should load create Location page', async () => {
        await locationComponentsPage.clickOnCreateButton();
        locationUpdatePage = new LocationUpdatePage();
        expect(await locationUpdatePage.getPageTitle()).to.eq('jhiApp.location.home.createOrEditLabel');
        await locationUpdatePage.cancel();
    });

    it('should create and save Locations', async () => {
        const nbButtonsBeforeCreate = await locationComponentsPage.countDeleteButtons();

        await locationComponentsPage.clickOnCreateButton();
        await locationUpdatePage.setStreetAddressInput('streetAddress');
        expect(await locationUpdatePage.getStreetAddressInput()).to.eq('streetAddress');
        await locationUpdatePage.setPostalCodeInput('postalCode');
        expect(await locationUpdatePage.getPostalCodeInput()).to.eq('postalCode');
        await locationUpdatePage.setCityInput('city');
        expect(await locationUpdatePage.getCityInput()).to.eq('city');
        await locationUpdatePage.setStateProvinceInput('stateProvince');
        expect(await locationUpdatePage.getStateProvinceInput()).to.eq('stateProvince');
        await locationUpdatePage.countrySelectLastOption();
        await locationUpdatePage.save();
        expect(await locationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await locationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Location', async () => {
        const nbButtonsBeforeDelete = await locationComponentsPage.countDeleteButtons();
        await locationComponentsPage.clickOnLastDeleteButton();

        locationDeleteDialog = new LocationDeleteDialog();
        expect(await locationDeleteDialog.getDialogTitle()).to.eq('jhiApp.location.delete.question');
        await locationDeleteDialog.clickOnConfirmButton();

        expect(await locationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
