import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IModel} from '../models/model';
import {IDataService} from '../data-service';
import {ColumnDef, IColumnDef} from './column-def';

interface ColField {
    value: string;
}

interface IColumn {
    field: string; // the property to use for this field
    header: string;
}

type Row = {[key: string]: ColField};

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    @Input() service: IDataService;
    @Input() columnDefs: ColumnDef[];

    header: string;

    rows$: Observable<Row[]>;

    columns: IColumn[];

    ngOnInit() {
        // We want to map the data stream coming from the service
        // which is a stream of IModel[] to a stream of rows Row[]
        const mapDataFn = function (data: IModel[]) {
            const mapped = data.map(this.mapRowFn);

            return mapped;
        };

        this.rows$ = this.service.data$.map((data: IModel[]) =>
            data.map(x =>
                this.mapRowFn(x) ));

        this.columns = this.getColumns();

        this.header = this.service.model.namePlural;
    }

    mapRowFn(model: IModel): Row {
        const mappedRow = {};

        for (const colDef of this.columnDefs) {
            const val = model.get(colDef.key);
            mappedRow[colDef.key] = {
                value: val
            };
        }
        return mappedRow;
    }

    getColumns(): IColumn[] {
        if (!this.columnDefs || !this.columnDefs.length) {
            return [];
        }

        const mapFn = function (col: IColumnDef): IColumn {
            return {
                field: col.key,
                header: col.header
            };
        };

        return this.columnDefs.map(mapFn);
    }
}
