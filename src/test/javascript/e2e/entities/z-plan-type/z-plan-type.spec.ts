/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ZPlanTypeComponentsPage, ZPlanTypeDeleteDialog, ZPlanTypeUpdatePage } from './z-plan-type.page-object';

const expect = chai.expect;

describe('ZPlanType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let zPlanTypeUpdatePage: ZPlanTypeUpdatePage;
    let zPlanTypeComponentsPage: ZPlanTypeComponentsPage;
    let zPlanTypeDeleteDialog: ZPlanTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ZPlanTypes', async () => {
        await navBarPage.goToEntity('z-plan-type');
        zPlanTypeComponentsPage = new ZPlanTypeComponentsPage();
        expect(await zPlanTypeComponentsPage.getTitle()).to.eq('jhiApp.zPlanType.home.title');
    });

    it('should load create ZPlanType page', async () => {
        await zPlanTypeComponentsPage.clickOnCreateButton();
        zPlanTypeUpdatePage = new ZPlanTypeUpdatePage();
        expect(await zPlanTypeUpdatePage.getPageTitle()).to.eq('jhiApp.zPlanType.home.createOrEditLabel');
        await zPlanTypeUpdatePage.cancel();
    });

    it('should create and save ZPlanTypes', async () => {
        const nbButtonsBeforeCreate = await zPlanTypeComponentsPage.countDeleteButtons();

        await zPlanTypeComponentsPage.clickOnCreateButton();
        await zPlanTypeUpdatePage.setTypeNameInput('typeName');
        expect(await zPlanTypeUpdatePage.getTypeNameInput()).to.eq('typeName');
        await zPlanTypeUpdatePage.save();
        expect(await zPlanTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await zPlanTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ZPlanType', async () => {
        const nbButtonsBeforeDelete = await zPlanTypeComponentsPage.countDeleteButtons();
        await zPlanTypeComponentsPage.clickOnLastDeleteButton();

        zPlanTypeDeleteDialog = new ZPlanTypeDeleteDialog();
        expect(await zPlanTypeDeleteDialog.getDialogTitle()).to.eq('jhiApp.zPlanType.delete.question');
        await zPlanTypeDeleteDialog.clickOnConfirmButton();

        expect(await zPlanTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
