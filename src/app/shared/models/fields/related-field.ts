import {IField} from './field';
import {BaseModel} from '../model';

export class RelatedField<T extends BaseModel> implements IField {
    key: string;
    name: string;
    value: T;

    constructor(model: T) {
        this.key = model.key;
        this.name = model.name;
        this.value = model;
    }

    title(): string {
        return this.name;
    }

    toString () : string {
        return this.value.toString();
    }

    public url(): string {
        // TODO: build URL from the service or router
        return `./${this.key}/${this.value.get('id')}`;
    }
}
