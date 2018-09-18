import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhiSharedModule } from 'app/shared';
import { JhiAdminModule } from 'app/admin/admin.module';
import {
    ZEntityComponent,
    ZEntityDetailComponent,
    ZEntityUpdateComponent,
    ZEntityDeletePopupComponent,
    ZEntityDeleteDialogComponent,
    zEntityRoute,
    zEntityPopupRoute
} from './';

const ENTITY_STATES = [...zEntityRoute, ...zEntityPopupRoute];

@NgModule({
    imports: [JhiSharedModule, JhiAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ZEntityComponent,
        ZEntityDetailComponent,
        ZEntityUpdateComponent,
        ZEntityDeleteDialogComponent,
        ZEntityDeletePopupComponent
    ],
    entryComponents: [ZEntityComponent, ZEntityUpdateComponent, ZEntityDeleteDialogComponent, ZEntityDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhiZEntityModule {}
