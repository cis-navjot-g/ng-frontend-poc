import {CustomerField} from '../customer/customer.field';
import {BaseField} from '../shared/models/fields/field';
import {IdField} from '../shared/models/fields/id-field';
import {TitleField} from '../shared/models/fields/title-field';
import {BaseModel} from '../shared/models/model';

export class ContractModel extends BaseModel {
    key = 'contract';
    name = 'Contract';
    namePlural = 'Contracts';
    fields = [
        new IdField(),
        new TitleField(),
        new BaseField('name', 'Name'),
        new CustomerField()
    ];
}
