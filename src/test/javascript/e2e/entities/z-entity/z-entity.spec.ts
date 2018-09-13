import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ZEntityComponentsPage, ZEntityDeleteDialog, ZEntityUpdatePage } from './z-entity.page-object';

describe('ZEntity e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let zEntityUpdatePage: ZEntityUpdatePage;
    let zEntityComponentsPage: ZEntityComponentsPage;
    let zEntityDeleteDialog: ZEntityDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ZEntities', async () => {
        await navBarPage.goToEntity('z-entity');
        zEntityComponentsPage = new ZEntityComponentsPage();
        expect(await zEntityComponentsPage.getTitle()).toMatch(/jhiApp.zEntity.home.title/);
    });

    it('should load create ZEntity page', async () => {
        await zEntityComponentsPage.clickOnCreateButton();
        zEntityUpdatePage = new ZEntityUpdatePage();
        expect(await zEntityUpdatePage.getPageTitle()).toMatch(/jhiApp.zEntity.home.createOrEditLabel/);
        await zEntityUpdatePage.cancel();
    });

    it('should create and save ZEntities', async () => {
        await zEntityComponentsPage.clickOnCreateButton();
        await zEntityUpdatePage.setEntityNameInput('entityName');
        expect(await zEntityUpdatePage.getEntityNameInput()).toMatch('entityName');
        await zEntityUpdatePage.setEntityAbbreInput('entityAbbre');
        expect(await zEntityUpdatePage.getEntityAbbreInput()).toMatch('entityAbbre');
        await zEntityUpdatePage.setEntityStdNameInput('entityStdName');
        expect(await zEntityUpdatePage.getEntityStdNameInput()).toMatch('entityStdName');
        await zEntityUpdatePage.setEntityTypeInput('5');
        expect(await zEntityUpdatePage.getEntityTypeInput()).toMatch('5');
        await zEntityUpdatePage.setIsGuiKouInput('5');
        expect(await zEntityUpdatePage.getIsGuiKouInput()).toMatch('5');
        await zEntityUpdatePage.createrSelectLastOption();
        await zEntityUpdatePage.save();
        expect(await zEntityUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last ZEntity', async () => {
        const nbButtonsBeforeDelete = await zEntityComponentsPage.countDeleteButtons();
        await zEntityComponentsPage.clickOnLastDeleteButton();

        zEntityDeleteDialog = new ZEntityDeleteDialog();
        expect(await zEntityDeleteDialog.getDialogTitle()).toMatch(/jhiApp.zEntity.delete.question/);
        await zEntityDeleteDialog.clickOnConfirmButton();

        expect(await zEntityComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
