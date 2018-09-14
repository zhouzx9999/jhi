import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhiZEntityModule } from './z-entity/z-entity.module';
import { JhiRegionModule } from './region/region.module';
import { JhiCountryModule } from './country/country.module';
import { JhiLocationModule } from './location/location.module';
import { JhiDepartmentModule } from './department/department.module';
import { JhiTaskModule } from './task/task.module';
import { JhiEmployeeModule } from './employee/employee.module';
import { JhiJobModule } from './job/job.module';
import { JhiJobHistoryModule } from './job-history/job-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhiZEntityModule,
        JhiRegionModule,
        JhiCountryModule,
        JhiLocationModule,
        JhiDepartmentModule,
        JhiTaskModule,
        JhiEmployeeModule,
        JhiJobModule,
        JhiJobHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhiEntityModule {}
