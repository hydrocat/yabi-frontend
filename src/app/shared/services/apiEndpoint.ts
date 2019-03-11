import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiEndpoint {
    constructor() {}

    public BASE = 'http://localhost:8080/';
    // Queries
    public QUERIES = `${this.BASE}queries`;
    public ADMIN_QUERIES = `${this.BASE}sqlQueries`;

    // Permission
    public PERMISSIONS = `${this.BASE}permissionTrees`;

    // Directory
    public DIRECTORIES = `${this.BASE}directories`;

    public RUNQUERY = (id: string) => `${this.BASE}runQuery/${id}`;

}
