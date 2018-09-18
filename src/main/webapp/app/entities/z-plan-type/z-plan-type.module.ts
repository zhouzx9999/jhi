import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhiSharedModule } from 'app/shared';
import {
    ZPlanTypeComponent,
    ZPlanTypeDetailComponent,
    ZPlanTypeUpdateComponent,
    ZPlanTypeDeletePopupComponent,
    ZPlanTypeDeleteDialogComponent,
    zPlanTypeRoute,
    zPlanTypePopupRoute
} from './';

const ENTITY_STATES = [...zPlanTypeRoute, ...zPlanTypePopupRoute];

@NgModule({
    imports: [JhiSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ZPlanTypeComponent,
        ZPlanTypeDetailComponent,
        ZPlanTypeUpdateComponent,
        ZPlanTypeDeleteDialogComponent,
        ZPlanTypeDeletePopupComponent
    ],
    entryComponents: [ZPlanTypeComponent, ZPlanTypeUpdateComponent, ZPlanTypeDeleteDialogComponent, ZPlanTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhiZPlanTypeModule {}
