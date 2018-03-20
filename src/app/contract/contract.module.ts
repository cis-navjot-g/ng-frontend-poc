import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ContractService} from './contract.service';
import {ContractList} from './contract-list.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        ContractList,
    ],
    providers: [
        ContractService
    ],
    declarations: [
        ContractList
    ]
})
export class ContractModule implements OnInit {
    ngOnInit() {
        console.log('ContracModule!');
    }
}
