export interface IZEntity {
    id?: number;
    entityName?: string;
    entityAbbre?: string;
    entityStdName?: string;
    entityType?: number;
    isGuiKou?: number;
    createrLogin?: string;
    createrId?: number;
}

export class ZEntity implements IZEntity {
    constructor(
        public id?: number,
        public entityName?: string,
        public entityAbbre?: string,
        public entityStdName?: string,
        public entityType?: number,
        public isGuiKou?: number,
        public createrLogin?: string,
        public createrId?: number
    ) {}
}
