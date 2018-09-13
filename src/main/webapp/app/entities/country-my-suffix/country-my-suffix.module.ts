import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhiSharedModule } from 'app/shared';
import {
    CountryMySuffixComponent,
    CountryMySuffixDetailComponent,
    CountryMySuffixUpdateComponent,
    CountryMySuffixDeletePopupComponent,
    CountryMySuffixDeleteDialogComponent,
    countryRoute,
    countryPopupRoute
} from './';

const ENTITY_STATES = [...countryRoute, ...countryPopupRoute];

@NgModule({
    imports: [JhiSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CountryMySuffixComponent,
        CountryMySuffixDetailComponent,
        CountryMySuffixUpdateComponent,
        CountryMySuffixDeleteDialogComponent,
        CountryMySuffixDeletePopupComponent
    ],
    entryComponents: [
        CountryMySuffixComponent,
        CountryMySuffixUpdateComponent,
        CountryMySuffixDeleteDialogComponent,
        CountryMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhiCountryMySuffixModule {}
