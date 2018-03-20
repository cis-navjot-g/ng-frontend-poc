import {BaseModel} from '../shared/models/model';
import {BaseField} from '../shared/models/fields/field';
import {IdField} from '../shared/models/fields/id-field';
import {TitleField} from '../shared/models/fields/title-field';

export class CustomerModel extends BaseModel {
    key = 'customer';
    name = 'Customer';
    namePlural = 'Customers';
    fields = [
        new IdField(),
        new TitleField('_title', 'Another Name'),
        new BaseField('name', 'Name')
    ];
}
