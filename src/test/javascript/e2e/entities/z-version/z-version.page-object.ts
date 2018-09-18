import { element, by, ElementFinder } from 'protractor';

export class ZVersionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-z-version div table .btn-danger'));
    title = element.all(by.css('jhi-z-version div h2#page-heading span')).first();

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

export class ZVersionUpdatePage {
    pageTitle = element(by.id('jhi-z-version-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    versionTypeInput = element(by.id('field_versionType'));
    accessTypeInput = element(by.id('field_accessType'));
    inUseInput = element(by.id('field_inUse'));
    dateInUseInput = element(by.id('field_dateInUse'));
    accessType1Select = element(by.id('field_accessType1'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setVersionTypeInput(versionType) {
        await this.versionTypeInput.sendKeys(versionType);
    }

    async getVersionTypeInput() {
        return this.versionTypeInput.getAttribute('value');
    }

    async setAccessTypeInput(accessType) {
        await this.accessTypeInput.sendKeys(accessType);
    }

    async getAccessTypeInput() {
        return this.accessTypeInput.getAttribute('value');
    }

    async setInUseInput(inUse) {
        await this.inUseInput.sendKeys(inUse);
    }

    async getInUseInput() {
        return this.inUseInput.getAttribute('value');
    }

    async setDateInUseInput(dateInUse) {
        await this.dateInUseInput.sendKeys(dateInUse);
    }

    async getDateInUseInput() {
        return this.dateInUseInput.getAttribute('value');
    }

    async setAccessType1Select(accessType1) {
        await this.accessType1Select.sendKeys(accessType1);
    }

    async getAccessType1Select() {
        return this.accessType1Select.element(by.css('option:checked')).getText();
    }

    async accessType1SelectLastOption() {
        await this.accessType1Select
            .all(by.tagName('option'))
            .last()
            .click();
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

export class ZVersionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-zVersion-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-zVersion'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
