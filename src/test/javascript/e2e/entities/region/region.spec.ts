import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RegionComponentsPage, RegionDeleteDialog, RegionUpdatePage } from './region.page-object';

describe('Region e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let regionUpdatePage: RegionUpdatePage;
    let regionComponentsPage: RegionComponentsPage;
    let regionDeleteDialog: RegionDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Regions', async () => {
        await navBarPage.goToEntity('region');
        regionComponentsPage = new RegionComponentsPage();
        expect(await regionComponentsPage.getTitle()).toMatch(/jhiApp.region.home.title/);
    });

    it('should load create Region page', async () => {
        await regionComponentsPage.clickOnCreateButton();
        regionUpdatePage = new RegionUpdatePage();
        expect(await regionUpdatePage.getPageTitle()).toMatch(/jhiApp.region.home.createOrEditLabel/);
        await regionUpdatePage.cancel();
    });

    it('should create and save Regions', async () => {
        await regionComponentsPage.clickOnCreateButton();
        await regionUpdatePage.setRegionNameInput('regionName');
        expect(await regionUpdatePage.getRegionNameInput()).toMatch('regionName');
        await regionUpdatePage.save();
        expect(await regionUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Region', async () => {
        const nbButtonsBeforeDelete = await regionComponentsPage.countDeleteButtons();
        await regionComponentsPage.clickOnLastDeleteButton();

        regionDeleteDialog = new RegionDeleteDialog();
        expect(await regionDeleteDialog.getDialogTitle()).toMatch(/jhiApp.region.delete.question/);
        await regionDeleteDialog.clickOnConfirmButton();

        expect(await regionComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
