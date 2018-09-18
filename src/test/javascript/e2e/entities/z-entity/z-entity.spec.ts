/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ZEntityComponentsPage, ZEntityDeleteDialog, ZEntityUpdatePage } from './z-entity.page-object';

const expect = chai.expect;

describe('ZEntity e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let zEntityUpdatePage: ZEntityUpdatePage;
    let zEntityComponentsPage: ZEntityComponentsPage;
    let zEntityDeleteDialog: ZEntityDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ZEntities', async () => {
        await navBarPage.goToEntity('z-entity');
        zEntityComponentsPage = new ZEntityComponentsPage();
        expect(await zEntityComponentsPage.getTitle()).to.eq('jhiApp.zEntity.home.title');
    });

    it('should load create ZEntity page', async () => {
        await zEntityComponentsPage.clickOnCreateButton();
        zEntityUpdatePage = new ZEntityUpdatePage();
        expect(await zEntityUpdatePage.getPageTitle()).to.eq('jhiApp.zEntity.home.createOrEditLabel');
        await zEntityUpdatePage.cancel();
    });

    it('should create and save ZEntities', async () => {
        const nbButtonsBeforeCreate = await zEntityComponentsPage.countDeleteButtons();

        await zEntityComponentsPage.clickOnCreateButton();
        await zEntityUpdatePage.setEntityNameInput('entityName');
        expect(await zEntityUpdatePage.getEntityNameInput()).to.eq('entityName');
        await zEntityUpdatePage.setEntityAbbreInput('entityAbbre');
        expect(await zEntityUpdatePage.getEntityAbbreInput()).to.eq('entityAbbre');
        await zEntityUpdatePage.setEntityStdNameInput('entityStdName');
        expect(await zEntityUpdatePage.getEntityStdNameInput()).to.eq('entityStdName');
        await zEntityUpdatePage.setEntityTypeInput('5');
        expect(await zEntityUpdatePage.getEntityTypeInput()).to.eq('5');
        await zEntityUpdatePage.setIsGuiKouInput('5');
        expect(await zEntityUpdatePage.getIsGuiKouInput()).to.eq('5');
        await zEntityUpdatePage.createrSelectLastOption();
        await zEntityUpdatePage.save();
        expect(await zEntityUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await zEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ZEntity', async () => {
        const nbButtonsBeforeDelete = await zEntityComponentsPage.countDeleteButtons();
        await zEntityComponentsPage.clickOnLastDeleteButton();

        zEntityDeleteDialog = new ZEntityDeleteDialog();
        expect(await zEntityDeleteDialog.getDialogTitle()).to.eq('jhiApp.zEntity.delete.question');
        await zEntityDeleteDialog.clickOnConfirmButton();

        expect(await zEntityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
