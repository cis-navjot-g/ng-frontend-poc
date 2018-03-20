export interface IColumnDef {
    key: string; // A key that should match a field's key on a model
    header: string;
    style: string; // Custom style for the column
}

export class ColumnDef implements IColumnDef {
    key: string;
    header: string;
    style: string;

    constructor(key: string, header: string, style?: string) {
        this.key = key;
        this.header = header;
        this.style = style;
    }
}

