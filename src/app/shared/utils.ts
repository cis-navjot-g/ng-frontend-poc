// Taken from https://www.stevefenton.co.uk/2014/07/creating-typescript-classes-dynamically/
export class InstanceLoader {
    static getInstance<T>(context: Object, name: string, ...args: any[]) : T {
        const instance = Object.create(context[name].prototype);
        instance.constructor.apply(instance, args);

        return <T> instance;
    }
}
