import { IRegionMySuffix } from 'app/shared/model//region-my-suffix.model';

export interface ICountryMySuffix {
    id?: number;
    countryName?: string;
    region?: IRegionMySuffix;
}

export class CountryMySuffix implements ICountryMySuffix {
    constructor(public id?: number, public countryName?: string, public region?: IRegionMySuffix) {}
}
