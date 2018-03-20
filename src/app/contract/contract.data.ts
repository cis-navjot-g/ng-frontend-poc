import {CustomerData} from '../customer/customer.data';
import {BaseData} from '../shared/data';

export interface ContractData extends BaseData {
    name: string;
    customer: CustomerData;
}
