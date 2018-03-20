import {isUndefined} from 'util';

import {IModel} from '../model';

export interface IField {
    key: string; // The property name
    name: string; // The string that will be used to display this field's name
    value: FieldValueType;
    title(): string; // Per default returns name
    toString(): string; // The string representation of value
}

export type FieldValueType = number | string | boolean | IModel;

export class BaseField implements IField {
    key: string;
    name: string; // Per default equals key
    value: FieldValueType;

    constructor(key: string, name?: string) {
        this.key = key;
        this.name = name;
        if (isUndefined(name)) {
            this.name = key;
        }
    }

    title(): string {
        return this.name; // TODO: translate
    }

    toString(): string {
        if (isUndefined(this.value)) {
            return '--';
        } else {
            return this.value.toString();
        }
    }
}
