import { PagingAndSortingRepository } from '../../shared/modules/hateoas/pagingAndSortingRepository.model';
import { Href, Accessor } from '../../shared/modules/hateoas/repository.model';
import { Entity } from '../../shared/modules/hateoas/entity.model';

export class PermissionRepository extends PagingAndSortingRepository<
  PermissionAccessor
> {}

export class PermissionAccessor implements Accessor {
  constructor(
    public acessorName = 'permissionTrees',
    public permissionTrees?: HateoasPermission[]
  ) {}
}

export class HateoasPermission extends Entity {
  constructor(
    public nodePath?: string,
    public description?: string,
    public _links?: {
      self: Href;
      permissionTree: Href;
      parent: Href;
      yabiUser: Href;
    }
  ) {
    super(_links);
  }

  toPermission(): Permission {
    const permission = new Permission(
      this.id,
      this.nodePath,
      this.description,
      this._links.parent.href
    );

    permission.uri = this.uri;
    return permission;
  }
}

export class Permission {
  constructor(
    public id?: number,
    public nodePath?: string,
    public description?: string,
    public parent?: string
  ) {}

  private _uri: string;
  get uri(): string {
    if (this._uri !== undefined) {
      return this._uri;
    } else {
      console.log(`permission ${this.id} has unknown uri`);
      throw new Error(`permission ${this.id} has unknown uri`);
    }
  }

  set uri(newUri: string) {
    this._uri = newUri;
  }

  toHateoas(): HateoasPermission {
    const p = new HateoasPermission();
    p.nodePath = this.nodePath;
    p.description = this.description;
    p.id = this.id;
    /*     p._links.parent.href = this.parent; */
    return p;
  }
}
