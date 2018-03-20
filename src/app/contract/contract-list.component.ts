import {Component, OnInit} from '@angular/core';
import {ContractService} from './contract.service';
import {ColumnDef} from '../shared/list/column-def';

@Component({
    selector: 'contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.css']
})
export class ContractList implements OnInit {
    columnDefs: ColumnDef[];

    constructor(public service: ContractService) {
        console.log('ContractList ngOnInit');
    }

    ngOnInit() {
        this.service.fetch({});

        this.columnDefs = [
            new ColumnDef('id', 'ID'),
            new ColumnDef('_title', 'Contract Name'),
            new ColumnDef('customer', this.service.model.getField('customer').name),
        ];
    }

}
