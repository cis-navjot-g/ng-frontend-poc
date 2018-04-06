import { Component, OnInit } from '@angular/core';
import {CustomerService} from './customer.service';
import {ColumnDef} from '../shared/list/column-def';
import { FetchOptions } from '../shared/data-service';

@Component({
    selector: 'customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css']
})
export class CustomerList implements OnInit {
    columnDefs: ColumnDef[];

    _query: FetchOptions =  {
        _query: {
            property: '',
            queryString: ''
        }
    };

    constructor(public service: CustomerService) {
    }

    ngOnInit() {
        console.log('CustomerList ngOnInit');
        this.getListItems(this._query);
    }

    getListItems(_query?: FetchOptions): void {
        this.service.fetch(_query);
        this.columnDefs = [
            new ColumnDef('id', 'ID'),
            new ColumnDef('_title', this.service.model.getField('_title').name),
        ];
    }
}
