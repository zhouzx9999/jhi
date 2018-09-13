import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhiRegionMySuffixModule } from './region-my-suffix/region-my-suffix.module';
import { JhiCountryMySuffixModule } from './country-my-suffix/country-my-suffix.module';
import { JhiLocationMySuffixModule } from './location-my-suffix/location-my-suffix.module';
import { JhiDepartmentMySuffixModule } from './department-my-suffix/department-my-suffix.module';
import { JhiTaskMySuffixModule } from './task-my-suffix/task-my-suffix.module';
import { JhiEmployeeMySuffixModule } from './employee-my-suffix/employee-my-suffix.module';
import { JhiJobMySuffixModule } from './job-my-suffix/job-my-suffix.module';
import { JhiJobHistoryMySuffixModule } from './job-history-my-suffix/job-history-my-suffix.module';
import { JhiZEntityModule } from './z-entity/z-entity.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhiRegionMySuffixModule,
        JhiCountryMySuffixModule,
        JhiLocationMySuffixModule,
        JhiDepartmentMySuffixModule,
        JhiTaskMySuffixModule,
        JhiEmployeeMySuffixModule,
        JhiJobMySuffixModule,
        JhiJobHistoryMySuffixModule,
        JhiZEntityModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhiEntityModule {}
