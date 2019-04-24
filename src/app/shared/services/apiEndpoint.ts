import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiEndpoint {

    constructor() {}

    public static BASE = 'http://localhost:8080/';
    public static LOGIN = `${ApiEndpoint.BASE}user/`;
    // Queries
    public static QUERIES = `${ApiEndpoint.BASE}queries`;
    public static ADMIN_QUERIES = `${ApiEndpoint.BASE}sqlQueries`;

    // Permission
    public static PERMISSIONS = `${ApiEndpoint.BASE}permissions`;
    public static ADMIN_PERMISSIONS = `${ApiEndpoint.BASE}permissionTrees`;

    // Directory
    public static DIRECTORIES = `${ApiEndpoint.BASE}directories`;

    // Users
    public static USERS = `${ApiEndpoint.BASE}yabiUsers`;

    // Specific query from Repository
    public static FIND_QUERY = (id: number) => `${ApiEndpoint.ADMIN_QUERIES}/${id}`;
    public static RUNQUERY = (id: number) => `${ApiEndpoint.BASE}runQuery/${id}`;

}
