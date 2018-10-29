/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ZVersionComponentsPage, ZVersionDeleteDialog, ZVersionUpdatePage } from './z-version.page-object';

const expect = chai.expect;

describe('ZVersion e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let zVersionUpdatePage: ZVersionUpdatePage;
    let zVersionComponentsPage: ZVersionComponentsPage;
    let zVersionDeleteDialog: ZVersionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ZVersions', async () => {
        await navBarPage.goToEntity('z-version');
        zVersionComponentsPage = new ZVersionComponentsPage();
        expect(await zVersionComponentsPage.getTitle()).to.eq('jhiApp.zVersion.home.title');
    });

    it('should load create ZVersion page', async () => {
        await zVersionComponentsPage.clickOnCreateButton();
        zVersionUpdatePage = new ZVersionUpdatePage();
        expect(await zVersionUpdatePage.getPageTitle()).to.eq('jhiApp.zVersion.home.createOrEditLabel');
        await zVersionUpdatePage.cancel();
    });

    it('should create and save ZVersions', async () => {
        const nbButtonsBeforeCreate = await zVersionComponentsPage.countDeleteButtons();

        await zVersionComponentsPage.clickOnCreateButton();
        await promise.all([
            zVersionUpdatePage.setVersionTypeInput('5'),
            zVersionUpdatePage.setAccessTypeInput('5'),
            zVersionUpdatePage.setInUseInput('5'),
            zVersionUpdatePage.setDateInUseInput('2000-12-31'),
            zVersionUpdatePage.accessType1SelectLastOption()
        ]);
        expect(await zVersionUpdatePage.getVersionTypeInput()).to.eq('5');
        expect(await zVersionUpdatePage.getAccessTypeInput()).to.eq('5');
        expect(await zVersionUpdatePage.getInUseInput()).to.eq('5');
        expect(await zVersionUpdatePage.getDateInUseInput()).to.eq('2000-12-31');
        await zVersionUpdatePage.save();
        expect(await zVersionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await zVersionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ZVersion', async () => {
        const nbButtonsBeforeDelete = await zVersionComponentsPage.countDeleteButtons();
        await zVersionComponentsPage.clickOnLastDeleteButton();

        zVersionDeleteDialog = new ZVersionDeleteDialog();
        expect(await zVersionDeleteDialog.getDialogTitle()).to.eq('jhiApp.zVersion.delete.question');
        await zVersionDeleteDialog.clickOnConfirmButton();

        expect(await zVersionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
