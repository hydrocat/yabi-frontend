import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiEndpoint {
    constructor() {}

    public BASE = 'http://localhost:8080/';
    public QUERIES = `${this.BASE}queries`;
    public ADMIN_QUERIES = `${this.BASE}sqlQueries`;
    public RUNQUERY = (id: number) => `${this.BASE}runQuery/${id}`;
}
