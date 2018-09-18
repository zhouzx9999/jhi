export interface IZPlanType {
    id?: number;
    typeName?: string;
}

export class ZPlanType implements IZPlanType {
    constructor(public id?: number, public typeName?: string) {}
}
