import {FieldValueType, IField} from './fields/field';
import {IData} from '../data';
import {IdField} from './fields/id-field';
import {TitleField} from './fields/title-field';
import {RelatedField} from './fields/related-field';

export interface IModel {
    fields: IField[];
    key: string;
    name: string;
    namePlural: string;
    toString(): string;
    get(key: string): FieldValueType;
    getField(key: string): IField;
    set(key: string, value: FieldValueType): void;
    keys(): string[];
    getFieldNames(): string[];
    populate(data: IData): void;
    map<T>(mapFn: (f: IField) => T): T[];
}

/***
 * A model takes an instance of JSON or API data restricted by IData, and expose methods
 * to retrieve data in the way we need it.
 * Through different data renderers, we can control the structure of our data, to use it in
 * different components.
 */
export abstract class BaseModel implements IModel {
    public abstract key: string;  // The public name of this model (e.g. 'customer')
    public abstract name: string; // E.g. 'Customer'
    public abstract namePlural: string; // E.g. 'Customers'

    /**
     * Put fields in an array to define their order and make them easy to access/retrieve
     * @type {IField[]}
     */
    public abstract fields: IField[] = [
        new IdField(),
        new TitleField()
    ];

    /***
     * The string representation of this specific model, e.g. 'Mr. John Smith'
     * @returns {string}
     */
    toString(): string {
        return this.get('_title').toString();
    }

    get(key: string): FieldValueType {
        const f = this.getField(key);

        return f ? f.value : undefined;
    }

    set(key: string, value: any): void {
        const f = this.getField(key);
        if (f) {
            f.value = value;
        }
    }

    getField(key: string): IField {
        for (const f of this.fields) {
            if (f.key === key) {
                return f;
            }
        }
        throw new Error(`Undefined key '${key}' in fields`);
    }

    /**
     * Return field names in an array
     * @returns {string[]}
     */
    getFieldNames(): string[] {
        return this.fields.map(x => x.name);
    }

    /**
     * Return field keys in an array
     * @returns {string[]}
     */
    keys(): string[] {
        return this.fields.map(x => x.key);
    }

    /**
     * Maps fields to an array of objects T
     * @param {(f: BaseField) => T} mapFn
     * @returns {T[]}
     */
    map<T>(mapFn: (f: IField) => T): T[] {
        return this.fields.map(mapFn);
    }

    populate(data: IData): void {
        for (const f of this.fields) {
            const key = f.key;
            if (data.hasOwnProperty(key)) {
                const val = data[key];
                if (f instanceof RelatedField) {
                    // then the value is actually the related model, so we don't want
                    // to overwrite it but populate it with the data.
                    f.value.populate(data[key]);
                } else {
                    f.value = val;
                }
            }
        }
    }
}
