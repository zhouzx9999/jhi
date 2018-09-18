import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CountryComponentsPage, CountryDeleteDialog, CountryUpdatePage } from './country.page-object';

describe('Country e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let countryUpdatePage: CountryUpdatePage;
    let countryComponentsPage: CountryComponentsPage;
    let countryDeleteDialog: CountryDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Countries', async () => {
        await navBarPage.goToEntity('country');
        countryComponentsPage = new CountryComponentsPage();
        expect(await countryComponentsPage.getTitle()).toMatch(/jhiApp.country.home.title/);
    });

    it('should load create Country page', async () => {
        await countryComponentsPage.clickOnCreateButton();
        countryUpdatePage = new CountryUpdatePage();
        expect(await countryUpdatePage.getPageTitle()).toMatch(/jhiApp.country.home.createOrEditLabel/);
        await countryUpdatePage.cancel();
    });

    it('should create and save Countries', async () => {
        await countryComponentsPage.clickOnCreateButton();
        await countryUpdatePage.setCountryNameInput('countryName');
        expect(await countryUpdatePage.getCountryNameInput()).toMatch('countryName');
        await countryUpdatePage.regionSelectLastOption();
        await countryUpdatePage.save();
        expect(await countryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Country', async () => {
        const nbButtonsBeforeDelete = await countryComponentsPage.countDeleteButtons();
        await countryComponentsPage.clickOnLastDeleteButton();

        countryDeleteDialog = new CountryDeleteDialog();
        expect(await countryDeleteDialog.getDialogTitle()).toMatch(/jhiApp.country.delete.question/);
        await countryDeleteDialog.clickOnConfirmButton();

        expect(await countryComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
