import { BaseModel } from './model';
import { IField } from './fields/field';

export interface Listable extends BaseModel {
    key: string;  // The name of this model (e.g. 'customer')
    name: string; // E.g. 'Customer'
    namePlural: string; // E.g. 'Customers'

    /**
     * Put fields in an array to define their order and make them easy to access/retrieve
     * @type {IField[]}
     */
    fields: IField[];
}
