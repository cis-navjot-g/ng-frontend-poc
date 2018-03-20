import {DataService} from '../shared/data-service';
import {CustomerModel} from './customer';
import {Inject, Injectable} from '@angular/core';
import {ApiService} from '../shared/api-service';

@Injectable()
export class CustomerService extends DataService<CustomerModel> {
    constructor(dataService: ApiService) {
        console.log('Got a new CustomerService here!');
        super(CustomerModel, dataService);
    }
}
