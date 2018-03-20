import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerList } from './customer-list.component';
import {SharedModule} from '../shared/shared.module';
import {CustomerService} from './customer.service';

describe('CustomerListComponent', () => {
    let component: CustomerList;
    let fixture: ComponentFixture<CustomerList>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CustomerList],
            imports: [SharedModule],
            providers: [CustomerService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerList);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
