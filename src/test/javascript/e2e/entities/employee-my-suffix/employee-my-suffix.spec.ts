import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmployeeComponentsPage, EmployeeDeleteDialog, EmployeeUpdatePage } from './employee-my-suffix.page-object';

describe('Employee e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let employeeUpdatePage: EmployeeUpdatePage;
    let employeeComponentsPage: EmployeeComponentsPage;
    let employeeDeleteDialog: EmployeeDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Employees', async () => {
        await navBarPage.goToEntity('employee-my-suffix');
        employeeComponentsPage = new EmployeeComponentsPage();
        expect(await employeeComponentsPage.getTitle()).toMatch(/jhiApp.employee.home.title/);
    });

    it('should load create Employee page', async () => {
        await employeeComponentsPage.clickOnCreateButton();
        employeeUpdatePage = new EmployeeUpdatePage();
        expect(await employeeUpdatePage.getPageTitle()).toMatch(/jhiApp.employee.home.createOrEditLabel/);
        await employeeUpdatePage.cancel();
    });

    it('should create and save Employees', async () => {
        await employeeComponentsPage.clickOnCreateButton();
        await employeeUpdatePage.setFirstNameInput('firstName');
        expect(await employeeUpdatePage.getFirstNameInput()).toMatch('firstName');
        await employeeUpdatePage.setLastNameInput('lastName');
        expect(await employeeUpdatePage.getLastNameInput()).toMatch('lastName');
        await employeeUpdatePage.setEmailInput('email');
        expect(await employeeUpdatePage.getEmailInput()).toMatch('email');
        await employeeUpdatePage.setPhoneNumberInput('phoneNumber');
        expect(await employeeUpdatePage.getPhoneNumberInput()).toMatch('phoneNumber');
        await employeeUpdatePage.setHireDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await employeeUpdatePage.getHireDateInput()).toContain('2001-01-01T02:30');
        await employeeUpdatePage.setSalaryInput('5');
        expect(await employeeUpdatePage.getSalaryInput()).toMatch('5');
        await employeeUpdatePage.setCommissionPctInput('5');
        expect(await employeeUpdatePage.getCommissionPctInput()).toMatch('5');
        await employeeUpdatePage.departmentSelectLastOption();
        await employeeUpdatePage.managerSelectLastOption();
        await employeeUpdatePage.save();
        expect(await employeeUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Employee', async () => {
        const nbButtonsBeforeDelete = await employeeComponentsPage.countDeleteButtons();
        await employeeComponentsPage.clickOnLastDeleteButton();

        employeeDeleteDialog = new EmployeeDeleteDialog();
        expect(await employeeDeleteDialog.getDialogTitle()).toMatch(/jhiApp.employee.delete.question/);
        await employeeDeleteDialog.clickOnConfirmButton();

        expect(await employeeComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
