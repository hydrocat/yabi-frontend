import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiEndpoint {
    constructor() {}

    public BASE = 'http://localhost:8080/';
    // Queries
    // Dependent on User
    public QUERIES = `${this.BASE}queries`;
    // Independednt
    public ADMIN_QUERIES = `${this.BASE}sqlQueries`;

    // Permission
    public ADMIN_PERMISSIONS = `${this.BASE}permissionTrees`;
    public PERMISSIONS = `${this.BASE}permissions`;

    // Directory
    public DIRECTORIES = `${this.BASE}directories`;

    // Specific query from Repository
    public FIND_QUERY = (id: number) => `${this.ADMIN_QUERIES}/${id}`;
    public RUNQUERY = (id: number) => `${this.BASE}runQuery/${id}`;

}
