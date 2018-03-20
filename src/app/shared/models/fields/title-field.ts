import {isUndefined} from 'util';

import {BaseField} from './field';

export class TitleField extends BaseField {
    value: string;

    constructor(key?: string, name?: string) {
        if (isUndefined(key)) {
            key = '_title';
        }
        if (isUndefined(name)) {
            // Normally, the _title field replaces the name field
            name = 'Display Name';
        }
        super(key, name);
    }
}
