export class Sort {
    property: string;
    direction: string;

    constructor(property: string, direction: string = 'asc') {
        this.property = property;
        this.direction = direction;
    }
}

export class Pageable {
    page!: number;
    size!: number;
    sorts: Sort[] = new Array<Sort>();
    private filters: any = {};

    static create(): Pageable {
        return new Pageable();
    }
    sortBy(field: string, order: number): Pageable {
        const sort = this.sorts.find(s => s.property === field);
        if (sort) {
            sort.property = field;
            sort.direction = order > 0 ? 'asc' : 'desc';
        } else { this.sorts.push(new Sort(field, order > 0 ? 'asc' : 'desc')); }
        return this;
    }

    freshSortBy(field: string, order: number): Pageable {
        this.sorts = new Array<Sort>();
        this.sorts.push(new Sort(field, order > 0 ? 'asc' : 'desc'));
        return this;
    }

    setPage(page: number, size?: number): Pageable {
        this.page = page;
        this.size = size ? size : this.size;
        return this;
    }

    setFilter(key: string | number, value: any) {
        this.filters[key] = value;
    }

    getFilter(key: string | number) {
        return this.filters[key];
    }

    setFilters(filters: any) {
        if (filters) {
            // tslint:disable-next-line:forin
            for (const key in filters) {
                // tslint:disable-next-line:no-unused-expression
                filters[key] && (this.filters[key] = filters[key]);
            }
        }
    }

    bind(params?: URLSearchParams) {
        params = !params ? new URLSearchParams() : params;
        // tslint:disable-next-line:no-unused-expression
        this.page && params.set('page', String(this.page));
        // tslint:disable-next-line:no-unused-expression
        this.size && params.set('size', String(this.size));

        for (const sort of this.sorts) {
            // tslint:disable-next-line:no-unused-expression
            sort && params.append('sort', sort.property + ',' + sort.direction);
        }
        // tslint:disable-next-line:forin
        for (const filter in this.filters) {
            // tslint:disable-next-line:no-unused-expression
            filter && this.filters[filter] && params.append(filter, this.filters[filter]);
        }
        return params;
    }
    // tslint:disable-next-line:member-ordering
    static eq(x: string | any[] | null | undefined, y: string  | any[] | null | undefined) {
        'use strict';

        if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
        // after this just checking type of one would be enough
        if (x.constructor !== y.constructor) { return false; }
        // if they are functions, they should exactly refer to same one (because of closures)
        if (x instanceof Function) { return x === y; }
        // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
        if (x instanceof RegExp) { return x === y; }
        if (x === y || x.valueOf() === y.valueOf()) { return true; }
        if (Array.isArray(x) && x.length !== y.length) { return false; }

        // if they are dates, they must had equal valueOf
        if (x instanceof Date) { return false; }

        // if they are strictly equal, they both need to be object at least
        if (!(x instanceof Object)) { return false; }
        if (!(y instanceof Object)) { return false; }

        // recursive object equality check
        const p = Object.keys(x);
        return Object.keys(y).every((i) => p.indexOf(i) !== -1) ;
           // p.every((i) => this.eq(x[i], y[i]));
    }

}
export class Page<T> {
    content!: Array<T>;
    number = 0;
    first!: boolean;
    last!: boolean;
    numberOfElements = 0;
    size = 0;
    sort = new Array<Sort>();
    totalElements = 0;
    totalPages = 0;

    constructor(page: any = { content: new Array<T>(), numberOfElements: 0, size: 0, number: 0, totalElements: 0 }) {
        if (page) {
            this.content = page.content;
            this.number = page.number;
            this.numberOfElements = page.numberOfElements;
            this.size = page.size;
            this.first = page.first;
            this.totalElements = page.totalElements;
            this.totalPages = page.totalPages;
            this.sort = page.sort ? page.sort : this.sort;
        }
    }

    // hasSort(sort: any) {
    //     return this.sort.some((s) => Page.eq(sort, s));
    // }

    get items() {
        return this.content;
    }

    get pageable(): Pageable {
        const pageable = new Pageable();
        pageable.page = this.number;
        pageable.size = this.size;
        pageable.sorts = this.sort;
        return pageable;
    }

    get offset() {
        return (this.numberOfElements) ? (this.size * this.number) + 1 : 0;
    }
    // tslint:disable-next-line:member-ordering
    // static eq(x: string | any[] | null | undefined, y: string  | any[] | Sort | null | undefined) {
    //     'use strict';

    //     if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
    //     // after this just checking type of one would be enough
    //     if (x.constructor !== y.constructor) { return false; }
    //     // if they are functions, they should exactly refer to same one (because of closures)
    //     if (x instanceof Function) { return x === y; }
    //     // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    //     if (x instanceof RegExp) { return x === y; }
    //     if (x === y || x.valueOf() === y.valueOf()) { return true; }
    //     if (Array.isArray(x) && x.length !== y.length) { return false; }

    //     // if they are dates, they must had equal valueOf
    //     if (x instanceof Date) { return false; }

    //     // if they are strictly equal, they both need to be object at least
    //     if (!(x instanceof Object)) { return false; }
    //     if (!(y instanceof Object)) { return false; }

    //     // recursive object equality check
    //     const p = Object.keys(x);
    //     return Object.keys(y).every((i) => p.indexOf(i) !== -1) &&
    //         p.every((i) => this.eq(x[i], y[i]));
    // }
}
