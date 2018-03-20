## Excercises

### Before starting: Fork and install this repository.

Fork this repository in github and clone your fork on your local machine. 

Before installing the node_modules, be sure to use a recent enough node/npm version. 
This was tested with node version 8.6.0 and npm 5.6.0.

Run `npm install` and `npm test` to check that the installation was successful. 

Start the application with `npm start`.

### Task 1 (basic) Extend `BaseModel` with `ListableModel`

- As described in the "An idea of how to implement a listable model with interfaces" 
from the README.md, create a new `ListableModel` class and extend it with `BaseModel`.
 
- Make the changes as described in the README.

- Check that the tests still work and fix them if they don't ;-)

### Task 2 (moderate) Build a `search` module and a search component to filter items.
 
1) Extend the `DataService` `fetch` method to be able to filter $data through the
 `options` parameter. For example, the options parameter could like this:
 
 ```typescript
interface FetchOptions {
    _query: {
        property: string,
        queryString: string
    }
}

public fetch(options?: FetchOptions): void {
    //.... do something with _query to filter data
}
```
2) Create a new search.component.ts which would set `_query` in `FetchOptions` and 
call `fetch` with this options on the service.

For simplicity reasons, make `_query.property` to filter a pre-defined property, 
for example `_title`.

### Task 3 (advanced) Expand the search component for searching available properties.

1) Create a new filters module. And a new `FilterDef` class, that would work in a
similar way as with `ColumnDef` for the `ListComponent`.

2) In the `ContractList` component, create a `filterDefs: FilterDef[]` list, with
definitions for `name` and `customer` (... to filter customers, it's enough to use
the customer's. `_title`. 

3) Expand the search-component to use this `columnDef` to select between the available
filters (by name or by customer) and filter data accordingly.

 

