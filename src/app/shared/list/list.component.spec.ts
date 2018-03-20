import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SharedModule} from '../shared.module';

import { ListComponent } from './list.component';
import {Observable} from 'rxjs/Observable';
import {BaseModel, IModel} from '../models/model';
import {BaseField} from '../models/fields/field';
import {DataService} from '../data-service';
import {ApiService, IApiService} from '../api-service';

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ListComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        class DummyApiService implements IApiService {
            get(key: string): Observable<any[]> {
                return Observable.of([
                    {id: 1, _title: 'bla'},
                    {id: 2, _title: 'bli'},
                    {id: 3, _title: 'blu'}
                ]);
            }
        }

        class DummyModel extends BaseModel {
            key = 'foo';
            name = 'Foo';
            namePlural = 'Foos';
            fields = [
                new BaseField('id', 'ID'),
                new BaseField('name', 'Name')
            ];
        }

        class DummyService extends DataService<DummyModel> {
            constructor() {
                super(DummyModel, new DummyApiService());
            }
        }

        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        component.service = new DummyService();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
