export class Pagination {

    searchString!: string;

    page!: number;
    rows!: number;
    sortBy!: string;
    sortOrder!: string;

    branch!: any[];
    role: string;
    conveyanceApplicable: string;
    dateFrom : string;
    dateTo: string;
    onLeave:string;
    nonAppUser!:string;
    constructor() {

        this.role = '';
        this.conveyanceApplicable = '';
        this.dateFrom = '';
        this.dateTo = '';
        this.onLeave='';
    }

}
