import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TaskComponentsPage, TaskDeleteDialog, TaskUpdatePage } from './task-my-suffix.page-object';

describe('Task e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let taskUpdatePage: TaskUpdatePage;
    let taskComponentsPage: TaskComponentsPage;
    let taskDeleteDialog: TaskDeleteDialog;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Tasks', async () => {
        await navBarPage.goToEntity('task-my-suffix');
        taskComponentsPage = new TaskComponentsPage();
        expect(await taskComponentsPage.getTitle()).toMatch(/jhiApp.task.home.title/);
    });

    it('should load create Task page', async () => {
        await taskComponentsPage.clickOnCreateButton();
        taskUpdatePage = new TaskUpdatePage();
        expect(await taskUpdatePage.getPageTitle()).toMatch(/jhiApp.task.home.createOrEditLabel/);
        await taskUpdatePage.cancel();
    });

    it('should create and save Tasks', async () => {
        await taskComponentsPage.clickOnCreateButton();
        await taskUpdatePage.setTitleInput('title');
        expect(await taskUpdatePage.getTitleInput()).toMatch('title');
        await taskUpdatePage.setDescriptionInput('description');
        expect(await taskUpdatePage.getDescriptionInput()).toMatch('description');
        await taskUpdatePage.save();
        expect(await taskUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should delete last Task', async () => {
        const nbButtonsBeforeDelete = await taskComponentsPage.countDeleteButtons();
        await taskComponentsPage.clickOnLastDeleteButton();

        taskDeleteDialog = new TaskDeleteDialog();
        expect(await taskDeleteDialog.getDialogTitle()).toMatch(/jhiApp.task.delete.question/);
        await taskDeleteDialog.clickOnConfirmButton();

        expect(await taskComponentsPage.countDeleteButtons()).toBe(nbButtonsBeforeDelete - 1);
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
