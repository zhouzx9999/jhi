import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DepartmentComponentsPage, DepartmentDeleteDialog, DepartmentUpdatePage } from './department.page-object';

describe('Department e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let departmentUpdatePage: DepartmentUpdatePage;
    let departmentComponentsPage: DepartmentComponentsPage;
    let departmentDeleteDialog: DepartmentDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Departments', async () => {
        await navBarPage.goToEntity('department');
        departmentComponentsPage = new DepartmentComponentsPage();
        expect(await departmentComponentsPage.getTitle()).toMatch(/jhiApp.department.home.title/);
    });

    it('should load create Department page', async () => {
        await departmentComponentsPage.clickOnCreateButton();
        departmentUpdatePage = new DepartmentUpdatePage();
        expect(await departmentUpdatePage.getPageTitle()).toMatch(/jhiApp.department.home.createOrEditLabel/);
        await departmentUpdatePage.cancel();
    });

    it('should create and save Departments', async () => {
        await departmentComponentsPage.clickOnCreateButton();
        await departmentUpdatePage.setDepartmentNameInput('departmentName');
        expect(await departmentUpdatePage.getDepartmentNameInput()).toMatch('departmentName');
        await departmentUpdatePage.locationSelectLastOption();
        await departmentUpdatePage.save();
        expect(await departmentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Department', async () => {
        const nbButtonsBeforeDelete = await departmentComponentsPage.countDeleteButtons();
        await departmentComponentsPage.clickOnLastDeleteButton();

        departmentDeleteDialog = new DepartmentDeleteDialog();
        expect(await departmentDeleteDialog.getDialogTitle()).toMatch(/jhiApp.department.delete.question/);
        await departmentDeleteDialog.clickOnConfirmButton();

        expect(await departmentComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
