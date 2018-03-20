# This is a POC to implement some concepts for the ng2+ implementation of our frontend.

## General structure / concept:

### Model

We represent incoming data from the REST API through the interface `IData` 
and store it in model-classes (extended from `BaseModel`) described by the `IModel` 
interface.
 
A model has a `fields` property, which is an array of `IField` and maps properties 
from the incoming data.

Here is an implementation of the `IModel` interface:

```typescript
export interface IModel {
    key: string; // e.g. 'customer'
    name: string; // e.g. 'Customer'
    namePlural: string; // e.g. 'Customers'
    fields: IField[]; 
    toString(): string; // the string representation of this model 
    get(key: string): FieldValueType; // get a field's value for this key
    getField(key: string): IField;
    set(key: string, value: FieldValueType): void; // set a field's value
    keys(): string[]; // The keys of our fields
    getFieldNames(): string[];
    populate(data: IData): void; // populate `fields` with a JSON-like (IData) object
    map<T>(mapFn: (f: IField) => T): T[]; // we use this to customize the format of our data
}
```

### Field 

Represents a property of our data described by the IField interface:

```typescript
export interface IField {
    key: string; // the property name of this field e.g. 'name'
    name: string; // e.g. 'Name'
    value: FieldValueType; // number | string | boolean | IModel | ... etc
    title(): string; // per default returns name
    toString(): string; // the string representation of the value
}
```

#### RelatedField

A field which value is a Model. For example CustomerField would extend RelatedField.

### Component services extend DataService

The DataService task is to fetch data for a component and turn it into Models so it
acts as a model factory. It uses the ApiService (or any other service specified by 
the component implementation) to retrieve the data. It has an observable stream 
'data$' which gets populated each time `fetch` is called.

```typescript
export interface IDataService {
    model: IModel;
    data$: Observable<IModel[]>; // Observable stream of data
    error$: Observable<string>;
    fetch(options?: object): void;
}
```

The `DataService` constructor becomes a model's constructor:

`modelType: {new(): T}`, 

which will be used by the `newModel()` method to create new model instances. 
As second parameter, it becomes the service implementing `IApiService`:

```typescript
abstract class DataService<T extends IModel> implements IDataService {
    //.....
    
    constructor(private modelType: {new(): T }, service: IApiService) {
        console.log('Got a new DataService here!');
        this.apiService = service;
        this.model = this.newModel();
        //....
    }
    
    //....
    
    newModel(): T {
        return new this.modelType();
    }
}
```

### ApiService

A service acting as a proxy between our different component services
(extended from `DataService`) and our API. This service takes care of retrieving our
data. It's important that our component services don't care where the data is
coming from and that the ApiService is easily exchanged. 

Q. Why do we need this proxy between our services and the HttpClient? 

A. Well, we don't really _need_ it, but it makes it really easy to just swap the 
service used by the `DataService` to retrieve the data. Also using different backends
for some components should be no problem with this architecture, and Stuff like 
using fixtures, writing tests, etc. should get easier ... at least in theory ;-)

All methods to retrieve or send data should become the following parameters:

- `key`: An API-Key or an object to build the endpoint in a generic way... 
    Examples:
    
         -> http://<api-base-url>/<some-prefix>/<endpoint-key>/<id>
         -> http://<some-local-path>/fixtures/<endpoint-key>-detail.json
         -> http://<some-local-path>/fixtures/<endpoint-key>-list.json

- `params`: parameters for the API (e.g. _query, _attributes, _limit, etc.)... 

So this would be the interface for an `ApiService` implementation (for simplicity
 reasons, we only implement the GET method for now):

```typescript
interface IApiService {
    get(key: string, params?: object): Observable<any[]>;
}
```

## Shared components (Lists, Search, etc) 

### Q. How should we add functionality to our models for listing, searching, etc. in a generic, DRY way?

#### An idea of how to implement a listable model with interfaces:

Our goal is to extend a model for being used in a DataGrid or Table, but keeping 
things concerning Lists, Filters, etc. out of the base model and also trying to
implement things as DRY as possible, i.e. _only_ extend or override the properties 
in the `fields` as necessary and reuse everything that makes sense.

To achieve this, we could extend the BaseModel with a `IListable` interface which
adds a `buildColumns` method like this:

```typescript
interface IColumnDef {
    key: string; // A key that should match a field's key on a model
    header: string; // Will default to the fields title()
    style: string; // or an object for adding style (e.g. width) to a column
    // ... maybe a template-id, sortable properties, ... etc. 
}

interface IListable {
    buildColumns(defs: IColumnDef[]): IColumnDef[];
}

interface IListableModel extends IModel, IListable {}

```

Then on the Customer- and ContractListComponent, instead of doing this:

```typescript
ngOnInit() {
    console.log('CustomerList ngOnInit');

    this.columnDefs = [
        new ColumnDef('id', 'ID'),
        new ColumnDef('_title', this.service.model.getField('_title').name),
    ];

    this.service.fetch({});
}

```

... we would only define the column's key and the method would take care of
 setting the column's header to the corresponding field's name per default, if
 no header was specified. Later on, we can also add support for adding URL to
 a model's detail view.

```typescript
ngOnInit() {
    console.log('CustomerList ngOnInit');

    this.columnDefs = this.service.model.buildColumns([
        new ColumnDef('id'),
        new ColumnDef('_title'),
    ]);

    this.service.fetch({});
}

```

This approach and architecture let us extend our models as our application grows,
without having to modify the base classes and giving us the flexibility to use
different third party components for displaying and interacting with our data.

# This is the README generated by the angular-cli:
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4123/`. The app will automatically reload if you change 
any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
