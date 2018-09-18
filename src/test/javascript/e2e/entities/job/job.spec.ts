/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { JobComponentsPage, JobDeleteDialog, JobUpdatePage } from './job.page-object';

const expect = chai.expect;

describe('Job e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let jobUpdatePage: JobUpdatePage;
    let jobComponentsPage: JobComponentsPage;
    let jobDeleteDialog: JobDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Jobs', async () => {
        await navBarPage.goToEntity('job');
        jobComponentsPage = new JobComponentsPage();
        expect(await jobComponentsPage.getTitle()).to.eq('jhiApp.job.home.title');
    });

    it('should load create Job page', async () => {
        await jobComponentsPage.clickOnCreateButton();
        jobUpdatePage = new JobUpdatePage();
        expect(await jobUpdatePage.getPageTitle()).to.eq('jhiApp.job.home.createOrEditLabel');
        await jobUpdatePage.cancel();
    });

    it('should create and save Jobs', async () => {
        const nbButtonsBeforeCreate = await jobComponentsPage.countDeleteButtons();

        await jobComponentsPage.clickOnCreateButton();
        await jobUpdatePage.setJobTitleInput('jobTitle');
        expect(await jobUpdatePage.getJobTitleInput()).to.eq('jobTitle');
        await jobUpdatePage.setMinSalaryInput('5');
        expect(await jobUpdatePage.getMinSalaryInput()).to.eq('5');
        await jobUpdatePage.setMaxSalaryInput('5');
        expect(await jobUpdatePage.getMaxSalaryInput()).to.eq('5');
        await jobUpdatePage.employeeSelectLastOption();
        // jobUpdatePage.taskSelectLastOption();
        await jobUpdatePage.save();
        expect(await jobUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await jobComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Job', async () => {
        const nbButtonsBeforeDelete = await jobComponentsPage.countDeleteButtons();
        await jobComponentsPage.clickOnLastDeleteButton();

        jobDeleteDialog = new JobDeleteDialog();
        expect(await jobDeleteDialog.getDialogTitle()).to.eq('jhiApp.job.delete.question');
        await jobDeleteDialog.clickOnConfirmButton();

        expect(await jobComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
