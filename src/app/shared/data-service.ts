import {IApiService} from './api-service';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {EmptyError, HttpError} from './errors/http-error';
import {IModel} from './models/model';
import {IData} from './data';

export interface IDataService {
    model: IModel;
    data$: Observable<IModel[]>; // Observable stream of data
    error$: Observable<any>;
    fetch(options?: object): void;
}

export abstract class DataService<T extends IModel> implements IDataService {
    public model: T;

    /**
     * Observable data stream. Components can subscribe to it, to get results.
     */
    data$: Observable<T[]>;

    /**
     * TODO: maybe it's better to keep our error-stream in another service
     * (maybe on the app component), so that it would 'survive' between components
     * and views?
     */
    error$: Observable<any>;

    protected dataSubject: ReplaySubject<T[]>;
    protected errorSubject: ReplaySubject<any>;
    protected apiService: IApiService;

    constructor(private modelType: {new(): T }, service: IApiService) {
        console.log('Got a new DataService here!');
        this.apiService = service;
        this.model = this.newModel();
        this.dataSubject = new ReplaySubject<T[]>(1);
        this.data$ = this.dataSubject.asObservable();
        this.errorSubject = new ReplaySubject<HttpError | EmptyError>(1);
        this.error$ = this.errorSubject.asObservable();
    }

    /**
     * Fetch data from and push it into the given
     * stream or to the errors stream, if an error occurs.
     * @param {string} key
     * @param {object} options
     */
    public fetch(options?: object): void {
        // TODO: implement options
        this.apiService.get(this.model.key, options)
            // Transform our of array of JSON IData into Models
            .map((data: IData[]) => {
                return data.map(x => {
                    const model: T = this.newModel();
                    model.populate(x);

                    return model;
                });
            })
            .catch(error => Observable.throw(this.newError(error.text())))
            .subscribe(
                data => this.dataSubject.next(data),
                err => this.errorSubject.next(err)
            );
    }

    /**
     * A method to get a new instance of a Model from it's type (or more
     * accurately, from it's constructor)
     * For this to work, we have to provide the constructor function in the constructor
     * like this: "modelConstructor: { new(...args: any[]): T ;}"
     * or with args like this: "modelConstructor: { new(...args: any[]): T ;}"
     * See: https://stackoverflow.com/a/26696476/466275
     * @returns {M}
     */
    newModel(): T {
        return new this.modelType();
    }

    protected newError(error: string) : HttpError {
        return new HttpError(error);
    }
}
