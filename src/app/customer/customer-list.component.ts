import { Component, OnInit } from '@angular/core';
import {CustomerService} from './customer.service';
import {ColumnDef} from '../shared/list/column-def';

@Component({
    selector: 'customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css']
})
export class CustomerList implements OnInit {
    columnDefs: ColumnDef[];

    constructor(public service: CustomerService) {
    }

    ngOnInit() {
        console.log('CustomerList ngOnInit');

        this.columnDefs = [
            new ColumnDef('id', 'ID'),
            new ColumnDef('_title', this.service.model.getField('_title').name),
        ];

        this.service.fetch({});
    }
}
