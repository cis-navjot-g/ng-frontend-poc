import {isUndefined} from 'util';

import {BaseField} from './field';

export class IdField extends BaseField {
    value: number | string;

    constructor(name?: string) {
        if (isUndefined(name)) {
            name = 'ID';
        }
        super('id', name);
    }
}
