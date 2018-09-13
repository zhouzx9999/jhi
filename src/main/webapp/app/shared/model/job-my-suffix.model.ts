import { IEmployeeMySuffix } from 'app/shared/model//employee-my-suffix.model';
import { ITaskMySuffix } from 'app/shared/model//task-my-suffix.model';

export interface IJobMySuffix {
    id?: number;
    jobTitle?: string;
    minSalary?: number;
    maxSalary?: number;
    employee?: IEmployeeMySuffix;
    tasks?: ITaskMySuffix[];
}

export class JobMySuffix implements IJobMySuffix {
    constructor(
        public id?: number,
        public jobTitle?: string,
        public minSalary?: number,
        public maxSalary?: number,
        public employee?: IEmployeeMySuffix,
        public tasks?: ITaskMySuffix[]
    ) {}
}
