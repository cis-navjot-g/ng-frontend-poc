import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FetchOptions } from '../data-service';
import { FilterDef } from '../list/filter-def';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() onChange = new EventEmitter();
  queryString: string;
  property = 'name';
  @Input() filterDefs: FilterDef[];
  detectChange() {
    const _query: FetchOptions =  {
        _query: {
            property: this.property,
            queryString: this.queryString
        }
    };
    this.onChange.next(_query);
  }

}
