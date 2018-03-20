import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContractList} from './contract-list.component';
import {SharedModule} from '../shared/shared.module';
import {ContractService} from './contract.service';

describe('ContractComponent', () => {
    let component: ContractList;
    let fixture: ComponentFixture<ContractList>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContractList],
            imports: [SharedModule],
            providers: [ContractService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContractList);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
