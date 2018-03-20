import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerService} from './customer.service';
import {CustomerList} from './customer-list.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        CustomerList
    ],
    providers: [CustomerService],
    declarations: [
        CustomerList
    ]
})
export class CustomerModule implements OnInit {
    ngOnInit() {
        console.log('CustomerModule!');
    }
}
