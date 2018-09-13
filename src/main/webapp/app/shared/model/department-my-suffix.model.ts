import { ILocationMySuffix } from 'app/shared/model//location-my-suffix.model';
import { IEmployeeMySuffix } from 'app/shared/model//employee-my-suffix.model';

export interface IDepartmentMySuffix {
    id?: number;
    departmentName?: string;
    location?: ILocationMySuffix;
    employees?: IEmployeeMySuffix[];
}

export class DepartmentMySuffix implements IDepartmentMySuffix {
    constructor(
        public id?: number,
        public departmentName?: string,
        public location?: ILocationMySuffix,
        public employees?: IEmployeeMySuffix[]
    ) {}
}
