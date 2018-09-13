import { ICountryMySuffix } from 'app/shared/model//country-my-suffix.model';

export interface ILocationMySuffix {
    id?: number;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    stateProvince?: string;
    country?: ICountryMySuffix;
}

export class LocationMySuffix implements ILocationMySuffix {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public country?: ICountryMySuffix
    ) {}
}
