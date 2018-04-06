import {Component, OnInit} from '@angular/core';
import {ContractService} from './contract.service';
import {ColumnDef} from '../shared/list/column-def';
import {FilterDef} from '../shared/list/filter-def';
import { FetchOptions } from '../shared/data-service';

@Component({
    selector: 'contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.css']
})
export class ContractList implements OnInit {
    columnDefs: ColumnDef[];
    filterDefs: FilterDef[];
    _query: FetchOptions =  {
        _query: {
            property: '',
            queryString: ''
        }
    };
    constructor(public service: ContractService) {
        console.log('ContractList ngOnInit');
    }

    ngOnInit() {
        this.filterDefs = [
            new FilterDef('name', 'Contract Name'),
            new FilterDef('customer', 'Customer Name')
        ];
        this.getListItems(this._query);
    }

    getListItems(_query?: FetchOptions): void {
        this.service.fetch(_query);

        this.columnDefs = [
            new ColumnDef('id', 'ID'),
            new ColumnDef('_title', 'Contract Name'),
            new ColumnDef('customer', this.service.model.getField('customer').name),
        ];

    }

}
