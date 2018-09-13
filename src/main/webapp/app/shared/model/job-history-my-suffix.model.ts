import { Moment } from 'moment';
import { IJobMySuffix } from 'app/shared/model//job-my-suffix.model';
import { IDepartmentMySuffix } from 'app/shared/model//department-my-suffix.model';
import { IEmployeeMySuffix } from 'app/shared/model//employee-my-suffix.model';

export const enum Language {
    FRENCH = 'FRENCH',
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH'
}

export interface IJobHistoryMySuffix {
    id?: number;
    startDate?: Moment;
    endDate?: Moment;
    language?: Language;
    job?: IJobMySuffix;
    department?: IDepartmentMySuffix;
    employee?: IEmployeeMySuffix;
}

export class JobHistoryMySuffix implements IJobHistoryMySuffix {
    constructor(
        public id?: number,
        public startDate?: Moment,
        public endDate?: Moment,
        public language?: Language,
        public job?: IJobMySuffix,
        public department?: IDepartmentMySuffix,
        public employee?: IEmployeeMySuffix
    ) {}
}
