import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface IApiService {
    get(key: string, options?: object): Observable<any[]>;
}

/**
 * A very simple service just fetching data from local json files with
 */
@Injectable()
export class ApiService implements IApiService{
    constructor(private http: HttpClient) {
        console.log('ApiService constructor!');
    }

    get(key: string, options?: object): Observable<any[]> {
        const fixturesBase = '/fixtures/';
        console.log(`get for '${key}'...`);
        let url: string;
        switch (key) {
            case 'contract':
                url = 'contracts.json';
                break;
            case 'customer':
                url = 'customers.json';
                break;
            default:
                url = 'empty.json';
        }
        url = fixturesBase + url;
        console.log(`get ${url}`);

        return this.http.get(url)
            .map(x => x['_data']);
    }
}
