import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhiRegionModule } from './region/region.module';
import { JhiCountryModule } from './country/country.module';
import { JhiLocationModule } from './location/location.module';
import { JhiDepartmentModule } from './department/department.module';
import { JhiTaskModule } from './task/task.module';
import { JhiEmployeeModule } from './employee/employee.module';
import { JhiJobModule } from './job/job.module';
import { JhiJobHistoryModule } from './job-history/job-history.module';
import { JhiZEntityModule } from './z-entity/z-entity.module';
import { JhiZPlanTypeModule } from './z-plan-type/z-plan-type.module';
import { JhiZVersionModule } from './z-version/z-version.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhiRegionModule,
        JhiCountryModule,
        JhiLocationModule,
        JhiDepartmentModule,
        JhiTaskModule,
        JhiEmployeeModule,
        JhiJobModule,
        JhiJobHistoryModule,
        JhiZEntityModule,
        JhiZPlanTypeModule,
        JhiZVersionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhiEntityModule {}
