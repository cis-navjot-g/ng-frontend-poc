import {RelatedField} from '../shared/models/fields/related-field';
import {CustomerModel} from './customer';

export class CustomerField extends RelatedField<CustomerModel> {
    constructor() {
        super(new CustomerModel());
    }
}
