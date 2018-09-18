import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ZVersionComponentsPage, ZVersionDeleteDialog, ZVersionUpdatePage } from './z-version.page-object';

describe('ZVersion e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let zVersionUpdatePage: ZVersionUpdatePage;
    let zVersionComponentsPage: ZVersionComponentsPage;
    let zVersionDeleteDialog: ZVersionDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ZVersions', async () => {
        await navBarPage.goToEntity('z-version');
        zVersionComponentsPage = new ZVersionComponentsPage();
        expect(await zVersionComponentsPage.getTitle()).toMatch(/jhiApp.zVersion.home.title/);
    });

    it('should load create ZVersion page', async () => {
        await zVersionComponentsPage.clickOnCreateButton();
        zVersionUpdatePage = new ZVersionUpdatePage();
        expect(await zVersionUpdatePage.getPageTitle()).toMatch(/jhiApp.zVersion.home.createOrEditLabel/);
        await zVersionUpdatePage.cancel();
    });

    it('should create and save ZVersions', async () => {
        await zVersionComponentsPage.clickOnCreateButton();
        await zVersionUpdatePage.setVersionTypeInput('5');
        expect(await zVersionUpdatePage.getVersionTypeInput()).toMatch('5');
        await zVersionUpdatePage.setAccessTypeInput('5');
        expect(await zVersionUpdatePage.getAccessTypeInput()).toMatch('5');
        await zVersionUpdatePage.setInUseInput('5');
        expect(await zVersionUpdatePage.getInUseInput()).toMatch('5');
        await zVersionUpdatePage.setDateInUseInput('2000-12-31');
        expect(await zVersionUpdatePage.getDateInUseInput()).toMatch('2000-12-31');
        await zVersionUpdatePage.accessType1SelectLastOption();
        await zVersionUpdatePage.save();
        expect(await zVersionUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last ZVersion', async () => {
        const nbButtonsBeforeDelete = await zVersionComponentsPage.countDeleteButtons();
        await zVersionComponentsPage.clickOnLastDeleteButton();

        zVersionDeleteDialog = new ZVersionDeleteDialog();
        expect(await zVersionDeleteDialog.getDialogTitle()).toMatch(/jhiApp.zVersion.delete.question/);
        await zVersionDeleteDialog.clickOnConfirmButton();

        expect(await zVersionComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
