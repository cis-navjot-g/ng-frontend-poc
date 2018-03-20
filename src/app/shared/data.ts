/**
 * This is the interface we'll use for methods that can take any BaseData
 * and children of it.
 */
export interface IData {
    id: number | string;
    _title: string;
}

export interface BaseData extends IData {
    id: number | string;
    _title: string;
}
