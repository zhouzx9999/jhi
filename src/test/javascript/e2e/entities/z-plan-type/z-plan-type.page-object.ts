import { element, by, ElementFinder } from 'protractor';

export class ZPlanTypeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-z-plan-type div table .btn-danger'));
    title = element.all(by.css('jhi-z-plan-type div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ZPlanTypeUpdatePage {
    pageTitle = element(by.id('jhi-z-plan-type-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    typeNameInput = element(by.id('field_typeName'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTypeNameInput(typeName) {
        await this.typeNameInput.sendKeys(typeName);
    }

    async getTypeNameInput() {
        return this.typeNameInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class ZPlanTypeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-zPlanType-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-zPlanType'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
