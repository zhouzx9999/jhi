import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { JobHistoryComponentsPage, JobHistoryDeleteDialog, JobHistoryUpdatePage } from './job-history.page-object';

describe('JobHistory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let jobHistoryUpdatePage: JobHistoryUpdatePage;
    let jobHistoryComponentsPage: JobHistoryComponentsPage;
    let jobHistoryDeleteDialog: JobHistoryDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load JobHistories', async () => {
        await navBarPage.goToEntity('job-history');
        jobHistoryComponentsPage = new JobHistoryComponentsPage();
        expect(await jobHistoryComponentsPage.getTitle()).toMatch(/jhiApp.jobHistory.home.title/);
    });

    it('should load create JobHistory page', async () => {
        await jobHistoryComponentsPage.clickOnCreateButton();
        jobHistoryUpdatePage = new JobHistoryUpdatePage();
        expect(await jobHistoryUpdatePage.getPageTitle()).toMatch(/jhiApp.jobHistory.home.createOrEditLabel/);
        await jobHistoryUpdatePage.cancel();
    });

    it('should create and save JobHistories', async () => {
        await jobHistoryComponentsPage.clickOnCreateButton();
        await jobHistoryUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await jobHistoryUpdatePage.getStartDateInput()).toContain('2001-01-01T02:30');
        await jobHistoryUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await jobHistoryUpdatePage.getEndDateInput()).toContain('2001-01-01T02:30');
        await jobHistoryUpdatePage.languageSelectLastOption();
        await jobHistoryUpdatePage.jobSelectLastOption();
        await jobHistoryUpdatePage.departmentSelectLastOption();
        await jobHistoryUpdatePage.employeeSelectLastOption();
        await jobHistoryUpdatePage.save();
        expect(await jobHistoryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last JobHistory', async () => {
        const nbButtonsBeforeDelete = await jobHistoryComponentsPage.countDeleteButtons();
        await jobHistoryComponentsPage.clickOnLastDeleteButton();

        jobHistoryDeleteDialog = new JobHistoryDeleteDialog();
        expect(await jobHistoryDeleteDialog.getDialogTitle()).toMatch(/jhiApp.jobHistory.delete.question/);
        await jobHistoryDeleteDialog.clickOnConfirmButton();

        expect(await jobHistoryComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
