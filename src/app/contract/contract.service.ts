import {ContractModel} from './contract';
import {DataService} from '../shared/data-service';
import {Inject, Injectable} from '@angular/core';
import {ApiService} from '../shared/api-service';

@Injectable()
export class ContractService extends DataService<ContractModel> {
    constructor(apiService: ApiService) {
        console.log('Got a new ContractService here!');
        super(ContractModel, apiService);
    }
}
