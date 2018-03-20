import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {ApiService} from './shared/api-service';
import {ContractModule} from './contract/contract.module';
import {ContractList} from './contract/contract-list.component';
import {CustomerList} from './customer/customer-list.component';
import {CustomerModule} from './customer/customer.module';

import {SharedModule} from './shared/shared.module';

const routes: Routes = [
    {   path: '',
        redirectTo: 'contracts',
        pathMatch: 'full'
    },
    {
        path: 'contracts',
        component: ContractList
    },
    {
        path: 'customers',
        component: CustomerList
    }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        FormsModule,
        SharedModule,
        ContractModule,
        CustomerModule
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
    ngOnInit() {
        console.log('AppModule ngOnInit!');
    }
}
