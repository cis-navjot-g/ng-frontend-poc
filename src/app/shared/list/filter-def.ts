export interface IFilterDef {
    key: string; // A key that should match a field's key on a model
    header: string;
}

export class FilterDef implements IFilterDef {
    key: string;
    header: string;

    constructor(key: string, header: string) {
        this.key = key;
        this.header = header;
    }
}
