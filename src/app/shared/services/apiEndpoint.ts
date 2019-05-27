import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpoint {
  constructor() {}

  public static BASE = SharedModule.apiBase;
  public static LOGIN = `${ApiEndpoint.BASE}user/`;
  // Queries
  public static QUERIES = `${ApiEndpoint.BASE}queries`;
  public static ADMIN_QUERIES = `${ApiEndpoint.BASE}sqlQueries`;

  // Permission
  public static PERMISSIONS = `${ApiEndpoint.BASE}permissions`;
  public static DELETE_PERMISSION = `${ApiEndpoint.BASE}permission`;
  public static ADMIN_PERMISSIONS = `${ApiEndpoint.BASE}permissionTrees`;

  // Directory
  public static DIRECTORIES = `${ApiEndpoint.BASE}directories`;

  // Users
  public static USERS = `${ApiEndpoint.BASE}yabiUsers`;
  public static USER_PERMISSIONS = (id: number) =>
    `${ApiEndpoint.USERS}/${id}/permissions`


  /**
   * Builds the url that corrensponds to the assiciation between
   * an user and a permission
   */
  public static USER_PERMISSION = (userId: number, permissionId: number) =>
    `${ApiEndpoint.USERS}/${userId}/permissions/${permissionId}`

  // Specific query from Repository
  public static FIND_QUERY = (id: number) =>
    `${ApiEndpoint.ADMIN_QUERIES}/${id}`
  public static RUNQUERY = (id: number) => `${ApiEndpoint.BASE}runQuery/${id}`;
}
