import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from './api-service';
import {ListComponent} from './list/list.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule
    ],
    exports: [
        ListComponent,
        SearchComponent
    ],
    declarations: [
        ListComponent,
        SearchComponent
    ],
    providers: [
        ApiService,
        HttpClient
    ]
})
export class SharedModule {
}
