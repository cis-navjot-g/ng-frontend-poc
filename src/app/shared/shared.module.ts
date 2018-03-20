import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from './api-service';
import {ListComponent} from './list/list.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        ListComponent
    ],
    declarations: [
        ListComponent
    ],
    providers: [
        ApiService,
        HttpClient
    ]
})
export class SharedModule {
}
