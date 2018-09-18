import { Moment } from 'moment';

export const enum Zenumer {
    COST = 'COST'
}

export interface IZVersion {
    id?: number;
    versionType?: number;
    accessType?: number;
    inUse?: number;
    dateInUse?: Moment;
    accessType1?: Zenumer;
}

export class ZVersion implements IZVersion {
    constructor(
        public id?: number,
        public versionType?: number,
        public accessType?: number,
        public inUse?: number,
        public dateInUse?: Moment,
        public accessType1?: Zenumer
    ) {}
}
