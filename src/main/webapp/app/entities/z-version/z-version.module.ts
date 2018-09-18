import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhiSharedModule } from 'app/shared';
import {
    ZVersionComponent,
    ZVersionDetailComponent,
    ZVersionUpdateComponent,
    ZVersionDeletePopupComponent,
    ZVersionDeleteDialogComponent,
    zVersionRoute,
    zVersionPopupRoute
} from './';

const ENTITY_STATES = [...zVersionRoute, ...zVersionPopupRoute];

@NgModule({
    imports: [JhiSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ZVersionComponent,
        ZVersionDetailComponent,
        ZVersionUpdateComponent,
        ZVersionDeleteDialogComponent,
        ZVersionDeletePopupComponent
    ],
    entryComponents: [ZVersionComponent, ZVersionUpdateComponent, ZVersionDeleteDialogComponent, ZVersionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhiZVersionModule {}
