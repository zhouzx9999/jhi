import { element, by, ElementFinder } from 'protractor';

export class ZEntityComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-z-entity div table .btn-danger'));
    title = element.all(by.css('jhi-z-entity div h2#page-heading span')).first();

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

export class ZEntityUpdatePage {
    pageTitle = element(by.id('jhi-z-entity-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    entityNameInput = element(by.id('field_entityName'));
    entityAbbreInput = element(by.id('field_entityAbbre'));
    entityStdNameInput = element(by.id('field_entityStdName'));
    entityTypeInput = element(by.id('field_entityType'));
    isGuiKouInput = element(by.id('field_isGuiKou'));
    createrSelect = element(by.id('field_creater'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setEntityNameInput(entityName) {
        await this.entityNameInput.sendKeys(entityName);
    }

    async getEntityNameInput() {
        return this.entityNameInput.getAttribute('value');
    }

    async setEntityAbbreInput(entityAbbre) {
        await this.entityAbbreInput.sendKeys(entityAbbre);
    }

    async getEntityAbbreInput() {
        return this.entityAbbreInput.getAttribute('value');
    }

    async setEntityStdNameInput(entityStdName) {
        await this.entityStdNameInput.sendKeys(entityStdName);
    }

    async getEntityStdNameInput() {
        return this.entityStdNameInput.getAttribute('value');
    }

    async setEntityTypeInput(entityType) {
        await this.entityTypeInput.sendKeys(entityType);
    }

    async getEntityTypeInput() {
        return this.entityTypeInput.getAttribute('value');
    }

    async setIsGuiKouInput(isGuiKou) {
        await this.isGuiKouInput.sendKeys(isGuiKou);
    }

    async getIsGuiKouInput() {
        return this.isGuiKouInput.getAttribute('value');
    }

    async createrSelectLastOption() {
        await this.createrSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async createrSelectOption(option) {
        await this.createrSelect.sendKeys(option);
    }

    getCreaterSelect(): ElementFinder {
        return this.createrSelect;
    }

    async getCreaterSelectedOption() {
        return this.createrSelect.element(by.css('option:checked')).getText();
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

export class ZEntityDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-zEntity-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-zEntity'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
